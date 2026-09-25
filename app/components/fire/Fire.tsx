import { useMemo, useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { useGLTF, useTexture } from "@react-three/drei";

export type FireInstanceConfig = {
  position: [number, number, number];
  rotationZ: number;
  targetScale: [number, number, number]; // [scaleX, scaleY, scaleZ]
  appearDelay: number;
};

interface FireProps {
  instances: FireInstanceConfig[];
  appearDuration: number;
}

const PHASE_DURATION = 0.2;

const VERTEX_ANIMATION_CHUNK = `
  #include <begin_vertex>
  if (abs(aAnimate) > 0.5) {
    float uCycle = mod(uTime * aSpeed + aPhase + aInstancePhaseOffset, ${(PHASE_DURATION * 2).toFixed(3)});
    float uT = uCycle < ${PHASE_DURATION.toFixed(3)}
      ? (uCycle / ${PHASE_DURATION.toFixed(3)})
      : (1.0 - (uCycle - ${PHASE_DURATION.toFixed(3)}) / ${PHASE_DURATION.toFixed(3)});
    transformed += aDirection * uAmplitude * aScale * uT * aAnimate;
  }
`;

const POSITION_EPSILON_RATIO = 1e-4;
const ANIMATED_FRACTION = 0.65;
const SCALE_MIN = 0.4 * 1.2;
const SCALE_MAX = 0.7 * 1.2;
const NEG_SCALE_MIN = 0.05 * 1.2;
const NEG_SCALE_MAX = 0.15 * 1.2;
const SPEED_MIN = 0.25 * 1.2;
const SPEED_MAX = 0.75 * 1.2;

// squash-and-stretch pop-in keyframes, mirroring the old framer-motion
// [0, peak, target] keyframes but driven manually per-instance
const APPEAR_PEAK_T = 0.6;
const APPEAR_XY_PEAK_MULT = 0.7;
const APPEAR_Z_PEAK_MULT = 1.35;

function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3);
}

function appearKeyframe(t: number, peak: number, target: number) {
  if (t <= 0) return 0;
  if (t >= 1) return target;
  if (t < APPEAR_PEAK_T) {
    return THREE.MathUtils.lerp(0, peak, easeOutCubic(t / APPEAR_PEAK_T));
  }
  return THREE.MathUtils.lerp(
    peak,
    target,
    easeOutCubic((t - APPEAR_PEAK_T) / (1 - APPEAR_PEAK_T)),
  );
}

function walkLoop(
  start: number,
  adjacency: Map<number, number[]>,
  visited: Set<number>,
) {
  const loop: number[] = [];
  let prev = -1;
  let current = start;
  while (current !== -1 && !visited.has(current)) {
    visited.add(current);
    loop.push(current);
    const neighbors = adjacency.get(current) || [];
    const next = neighbors.find((n) => n !== prev);
    prev = current;
    current = next === undefined ? -1 : next;
  }
  return loop;
}

function buildAnimateAttribute(geometry: THREE.BufferGeometry) {
  geometry.computeBoundingBox();
  const box = geometry.boundingBox!;
  const size = new THREE.Vector3();
  box.getSize(size);

  const posAttr = geometry.attributes.position;
  const vertexCount = posAttr.count;
  const p = new THREE.Vector3();

  const epsilon = size.length() * POSITION_EPSILON_RATIO;
  const groupId = new Int32Array(vertexCount).fill(-1);
  const groupPositions: THREE.Vector3[] = [];
  for (let i = 0; i < vertexCount; i++) {
    p.fromBufferAttribute(posAttr, i);
    let found = -1;
    for (let g = 0; g < groupPositions.length; g++) {
      if (p.distanceTo(groupPositions[g]) <= epsilon) {
        found = g;
        break;
      }
    }
    if (found === -1) {
      found = groupPositions.length;
      groupPositions.push(p.clone());
    }
    groupId[i] = found;
  }
  const groupCount = groupPositions.length;

  const centroid = new THREE.Vector3();
  groupPositions.forEach((gp) => centroid.add(gp));
  centroid.divideScalar(groupCount || 1);

  const index = geometry.index;
  const triCount = index ? index.count / 3 : vertexCount / 3;
  const getIndex = (n: number) => (index ? index.getX(n) : n);

  const edgeCount = new Map<string, number>();
  const edgeGroups = new Map<string, [number, number]>();
  for (let t = 0; t < triCount; t++) {
    const a = groupId[getIndex(t * 3)];
    const b = groupId[getIndex(t * 3 + 1)];
    const c = groupId[getIndex(t * 3 + 2)];
    (
      [
        [a, b],
        [b, c],
        [c, a],
      ] as const
    ).forEach(([x, y]) => {
      const key = x < y ? `${x}_${y}` : `${y}_${x}`;
      edgeCount.set(key, (edgeCount.get(key) || 0) + 1);
      edgeGroups.set(key, [x, y]);
    });
  }

  const boundaryAdjacency = new Map<number, number[]>();
  edgeCount.forEach((count, key) => {
    if (count !== 1) return;
    const [x, y] = edgeGroups.get(key)!;
    if (!boundaryAdjacency.has(x)) boundaryAdjacency.set(x, []);
    if (!boundaryAdjacency.has(y)) boundaryAdjacency.set(y, []);
    boundaryAdjacency.get(x)!.push(y);
    boundaryAdjacency.get(y)!.push(x);
  });

  const visited = new Set<number>();
  const loops: number[][] = [];
  boundaryAdjacency.forEach((_, start) => {
    if (visited.has(start)) return;
    const loop = walkLoop(start, boundaryAdjacency, visited);
    if (loop.length > 2) loops.push(loop);
  });

  loops.sort(
    (loopA, loopB) =>
      loopB.reduce((s, g) => s + groupPositions[g].distanceTo(centroid), 0) /
        loopB.length -
      loopA.reduce((s, g) => s + groupPositions[g].distanceTo(centroid), 0) /
        loopA.length,
  );

  const outerGroups = loops[0] ?? [];
  const tipGroups = loops[loops.length - 1] ?? [];

  const outwardGroups = new Set<number>();
  let acc = 0;
  outerGroups.forEach((g) => {
    acc += ANIMATED_FRACTION;
    if (acc >= 1) {
      outwardGroups.add(g);
      acc -= 1;
    }
  });

  const inwardGroups = outerGroups.filter((g) => !outwardGroups.has(g));
  const animatedGroups = new Set<number>(
    Array.from(outwardGroups).concat(inwardGroups),
  );

  const groupSign = new Float32Array(groupCount);
  const groupScale = new Float32Array(groupCount);
  const groupSpeed = new Float32Array(groupCount);
  const groupPhase = new Float32Array(groupCount);
  outwardGroups.forEach((g) => {
    groupSign[g] = 1;
    groupScale[g] = SCALE_MIN + Math.random() * (SCALE_MAX - SCALE_MIN);
    groupSpeed[g] = SPEED_MIN + Math.random() * (SPEED_MAX - SPEED_MIN);
    groupPhase[g] = Math.random() * PHASE_DURATION * 2;
  });
  inwardGroups.forEach((g) => {
    groupSign[g] = -1;
    groupScale[g] =
      NEG_SCALE_MIN + Math.random() * (NEG_SCALE_MAX - NEG_SCALE_MIN);
    groupSpeed[g] = SPEED_MIN + Math.random() * (SPEED_MAX - SPEED_MIN);
    groupPhase[g] = Math.random() * PHASE_DURATION * 2;
  });

  const animateFlags = new Float32Array(vertexCount);
  const scaleFlags = new Float32Array(vertexCount);
  const speedFlags = new Float32Array(vertexCount).fill(1);
  const phaseFlags = new Float32Array(vertexCount);
  for (let i = 0; i < vertexCount; i++) {
    const g = groupId[i];
    if (animatedGroups.has(g)) {
      animateFlags[i] = groupSign[g];
      scaleFlags[i] = groupScale[g];
      speedFlags[i] = groupSpeed[g];
      phaseFlags[i] = groupPhase[g];
    }
  }
  geometry.setAttribute("aAnimate", new THREE.BufferAttribute(animateFlags, 1));
  geometry.setAttribute("aScale", new THREE.BufferAttribute(scaleFlags, 1));
  geometry.setAttribute("aSpeed", new THREE.BufferAttribute(speedFlags, 1));
  geometry.setAttribute("aPhase", new THREE.BufferAttribute(phaseFlags, 1));

  const tipCentroid = new THREE.Vector3();
  tipGroups.forEach((g) => tipCentroid.add(groupPositions[g]));
  tipCentroid.divideScalar(tipGroups.length || 1);

  const baseCentroid = new THREE.Vector3();
  outerGroups.forEach((g) => baseCentroid.add(groupPositions[g]));
  baseCentroid.divideScalar(outerGroups.length || 1);
  const coneLength = baseCentroid.distanceTo(tipCentroid);

  const groupDirection = new Array<THREE.Vector3>(groupCount);
  animatedGroups.forEach((g) => {
    groupDirection[g] = groupPositions[g].clone().sub(tipCentroid).normalize();
  });

  const directions = new Float32Array(vertexCount * 3);
  for (let i = 0; i < vertexCount; i++) {
    const g = groupId[i];
    const dir = groupDirection[g];
    if (dir) {
      directions[i * 3] = dir.x;
      directions[i * 3 + 1] = dir.y;
      directions[i * 3 + 2] = dir.z;
    }
  }
  geometry.setAttribute("aDirection", new THREE.BufferAttribute(directions, 3));

  return { axisLength: coneLength };
}

const Fire = ({ instances, appearDuration }: FireProps) => {
  const { nodes } = useGLTF("/Fire_glb.glb");
  const diffuseMap = useTexture("/FireDiffuseDiffuse.png");
  diffuseMap.flipY = false;
  diffuseMap.colorSpace = THREE.SRGBColorSpace;

  const emissiveMap = useTexture("/FireEmission.jpg");
  emissiveMap.flipY = false;
  emissiveMap.colorSpace = THREE.SRGBColorSpace;

  const shaderRef = useRef<THREE.WebGLProgramParametersWithUniforms | null>(null);
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const mountTimeRef = useRef<number | null>(null);
  const doneRef = useRef(false);

  // built once and shared by every instance - only the per-instance transform
  // (position/rotation/scale, via the instance matrix) and a per-instance
  // phase offset (below) differ between copies
  const geometry = useMemo(() => {
    const sourceMesh = nodes.Cylinder001 as THREE.Mesh;
    const geo = sourceMesh.geometry.clone();
    // bake the node's own baked transform (translation/rotation/the 0.01
    // scale from the source GLB) into the geometry itself, since grabbing
    // just the geometry (for instancing) skips the node hierarchy that
    // used to apply it automatically
    sourceMesh.updateMatrix();
    geo.applyMatrix4(sourceMesh.matrix);
    buildAnimateAttribute(geo);

    const phaseOffsets = new Float32Array(
      instances.map(() => Math.random() * PHASE_DURATION * 2),
    );
    geo.setAttribute(
      "aInstancePhaseOffset",
      new THREE.InstancedBufferAttribute(phaseOffsets, 1),
    );

    return geo;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nodes, instances.length]);

  const material = useMemo(() => {
    geometry.computeBoundingBox();
    const box = geometry.boundingBox!;
    const size = new THREE.Vector3();
    box.getSize(size);
    const axisLength = size.length();

    const mat = new THREE.MeshStandardMaterial({
      map: diffuseMap,
      emissiveMap: emissiveMap,
      emissive: new THREE.Color(0xffffff),
      emissiveIntensity: 1.5,
      transparent: true,
      opacity: 0.7,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      side: THREE.DoubleSide,
    });
    mat.onBeforeCompile = (shader) => {
      shader.uniforms.uTime = { value: 0 };
      shader.uniforms.uAmplitude = { value: axisLength };

      shader.vertexShader = shader.vertexShader
        .replace(
          "#include <common>",
          `#include <common>
          attribute float aAnimate;
          attribute float aScale;
          attribute float aSpeed;
          attribute float aPhase;
          attribute float aInstancePhaseOffset;
          attribute vec3 aDirection;
          uniform float uTime;
          uniform float uAmplitude;`,
        )
        .replace("#include <begin_vertex>", VERTEX_ANIMATION_CHUNK);

      shaderRef.current = shader;
    };
    return mat;
  }, [geometry, diffuseMap, emissiveMap]);

  const matrix = useMemo(() => new THREE.Matrix4(), []);
  const positionVec = useMemo(() => new THREE.Vector3(), []);
  const quaternion = useMemo(() => new THREE.Quaternion(), []);
  const euler = useMemo(() => new THREE.Euler(), []);
  const scaleVec = useMemo(() => new THREE.Vector3(), []);

  useFrame((state) => {
    if (shaderRef.current) {
      shaderRef.current.uniforms.uTime.value = state.clock.elapsedTime;
    }

    if (doneRef.current || !meshRef.current) return;

    if (mountTimeRef.current === null) {
      mountTimeRef.current = state.clock.elapsedTime;
    }
    const elapsed = state.clock.elapsedTime - mountTimeRef.current;

    let allDone = true;
    instances.forEach((instance, i) => {
      const t = THREE.MathUtils.clamp(
        (elapsed - instance.appearDelay) / appearDuration,
        0,
        1,
      );
      if (t < 1) allDone = false;

      const [targetX, targetY, targetZ] = instance.targetScale;
      scaleVec.set(
        appearKeyframe(t, targetX * APPEAR_XY_PEAK_MULT, targetX),
        appearKeyframe(t, targetY * APPEAR_XY_PEAK_MULT, targetY),
        appearKeyframe(t, targetZ * APPEAR_Z_PEAK_MULT, targetZ),
      );

      positionVec.set(...instance.position);
      euler.set(0, 0, instance.rotationZ);
      quaternion.setFromEuler(euler);
      matrix.compose(positionVec, quaternion, scaleVec);
      meshRef.current!.setMatrixAt(i, matrix);
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
    if (allDone) doneRef.current = true;
  });

  return (
    <instancedMesh
      ref={meshRef}
      args={[geometry, material, instances.length]}
      frustumCulled={false}
    />
  );
};

useGLTF.preload("/Fire_glb.glb");
useTexture.preload("/FireDiffuseDiffuse.png");
useTexture.preload("/FireEmission.jpg");

export default Fire;
