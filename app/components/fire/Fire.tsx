import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { useGLTF, useTexture } from "@react-three/drei";

interface FireProps {
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: [number, number, number] | number;
}

const PHASE_DURATION = 0.2;

const VERTEX_ANIMATION_CHUNK = `
  #include <begin_vertex>
  if (abs(aAnimate) > 0.5) {
    float uCycle = mod(uTime * aSpeed + aPhase, ${(PHASE_DURATION * 2).toFixed(3)});
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

const Fire = ({
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  scale = [1, 1, 1],
}: FireProps) => {
  const { scene } = useGLTF("/Fire_glb.glb");
  const diffuseMap = useTexture("/FireDiffuseDiffuse.png");
  diffuseMap.flipY = false;
  diffuseMap.colorSpace = THREE.SRGBColorSpace;

  const emissiveMap = useTexture("/FireEmission.jpg");
  emissiveMap.flipY = false;
  emissiveMap.colorSpace = THREE.SRGBColorSpace;

  const instanceScene = useMemo(() => scene.clone(true), [scene]);
  const shaders = useRef<THREE.WebGLProgramParametersWithUniforms[]>([]);

  useEffect(() => {
    shaders.current = [];

    instanceScene.traverse((child) => {
      if (!(child instanceof THREE.Mesh)) return;

      child.geometry = child.geometry.clone();
      const { axisLength } = buildAnimateAttribute(child.geometry);

      const material = new THREE.MeshStandardMaterial({
        map: diffuseMap,
        emissiveMap: emissiveMap,
        emissive: new THREE.Color(0xffffff),
        emissiveIntensity: 1.5, // strength of the FireEmission.jpg self-lit glow
        transparent: true,
        opacity: 0.7,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        side: THREE.DoubleSide,
      });
      material.onBeforeCompile = (shader) => {
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
            attribute vec3 aDirection;
            uniform float uTime;
            uniform float uAmplitude;`,
          )
          .replace("#include <begin_vertex>", VERTEX_ANIMATION_CHUNK);

        shaders.current.push(shader);
      };

      child.material = material;
    });
  }, [instanceScene, diffuseMap, emissiveMap]);

  useFrame((state) => {
    for (const shader of shaders.current) {
      shader.uniforms.uTime.value = state.clock.elapsedTime;
    }
  });

  return (
    <primitive
      object={instanceScene}
      position={position}
      rotation={rotation}
      scale={scale}
    />
  );
};

useGLTF.preload("/Fire_glb.glb");
useTexture.preload("/FireDiffuseDiffuse.png");
useTexture.preload("/FireEmission.jpg");

export default Fire;
