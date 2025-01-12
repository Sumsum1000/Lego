'use client';
import { RapierRigidBody, Physics, RigidBody, CuboidCollider, BallCollider, useRapier } from "@react-three/rapier";
import { useEffect, useMemo, useRef, useState } from "react";
import { OrbitControls, PerspectiveCamera, useGLTF, useTexture } from "@react-three/drei";
import { Canvas, useThree, useFrame } from "@react-three/fiber";
import * as THREE from 'three';
import { Perf } from "r3f-perf";
import { InstancedMesh } from "three";

const COUNT = 100;

const InstancedModel = () => {
  const meshRef = useRef<THREE.Points>(null);
  const positions: THREE.Vector3[] = []; 

  const geometry = useMemo(() => {
    const positions = Array(COUNT)
      .fill(0)
      .map(() => new THREE.Vector3(
        Math.random() * 10 - 5, 
        20, // Start particles above the screen
        Math.random() * -1 - 8
      ));

    const particles = new THREE.BufferGeometry();
    particles.setAttribute('position', new THREE.Float32BufferAttribute(positions.flatMap(p => [p.x, p.y, p.z]), 3));
    return particles;
  }, []);

  const material = useMemo(() => {
    const texture = useTexture('/RedPiece.jpg');
    texture.flipY = false;
    texture.colorSpace = 'srgb';
    return new THREE.PointsMaterial({
      size: 0.5, 
      map: texture,
      alphaTest: 0.5, 
      transparent: true,
      depthTest: true,
    });
  }, []);
  
  return (
    <>
      {/* {Array(COUNT).fill(0).map((_, i) => (
        <RigidBody key={i} type="dynamic" colliders={false}> 
          <points position={positions[i]} geometry={geometry} material={material} />
        </RigidBody>
      ))} */}
      <points ref={meshRef} geometry={geometry} material={material} />
    </>
  );
};

//====================================================

const Particles = () => {
  const meshRef = useRef<InstancedMesh>(null);
  const { world } = useRapier(); 
  const scene = useGLTF('/RedPiece_01.glb') as any;
  const geometry = scene.nodes.Object039.geometry;
  const scaledGeometry = geometry.clone().scale(0.05, 0.05, 0.05);
  const diffuseMap = useTexture('/RedPiece.jpg')
  diffuseMap.colorSpace = 'srgb';

  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < COUNT; i++) {
      const x = Math.random() * 10 - 5;
      const y = 20; // Start particles above the screen
      const z = Math.random() * -1 - 8;

      temp.push({ x, y, z });
    }
    return temp;
  }, [COUNT]);

  const newMat = new THREE.MeshStandardMaterial({
    color: 'red',
    roughness: 0.65,
    map: diffuseMap,
  });

  useFrame(() => {
    if (meshRef.current) {
      for (let i = 0; i < COUNT; i++) {
        const { x, y, z } = particles[i];
        const matrix = new THREE.Matrix4();
        matrix.setPosition(new THREE.Vector3(x, y, z)); 
        meshRef.current.setMatrixAt(i, matrix); 
      }
      meshRef.current.instanceMatrix.needsUpdate = true; 
    }
  });

  return (
    <instancedMesh ref={meshRef} args={[scaledGeometry, newMat, COUNT]}>
    {Array(COUNT).fill(0).map((_, i) => (
      <RigidBody key={i} type="dynamic" colliders={false}> 
        <primitive object={meshRef.current.getObjectById(i)} /> 
      </RigidBody>
    ))}
  </instancedMesh>
  );
};


function ParticlesIntro() {
  return (
    <main className="h-screen w-screen bg-gray-600 flex justify-center">
      <Canvas className="h-full bg-gray-800" shadows>
        <Perf className='top-left' />
        <Physics gravity={[0, -9.1, 0]}>
          {/* <InstancedModel />  */}

            


          {/* Physics bodies */}
          <RigidBody type="fixed">
            <CuboidCollider args={[400, 2, 260]} position={[0, -2, 0]} />
          </RigidBody>
          <CursorFollower />
        </Physics>

        {/* Lights */}
        <mesh position={[2, 3, -9]}>
          <pointLight color='#6fc0d9' intensity={120} />
        </mesh>
        <ambientLight intensity={0.5} />

        {/* Camera */}
        <PerspectiveCamera makeDefault position={[0, 1.75, -4]} fov={75} />
        <OrbitControls />
      </Canvas>
    </main>
  );
}

function CursorFollower() {
  const rigidBodyRef = useRef<RapierRigidBody>(null); // Type the ref correctly
  //const previousPosition = useRef([0, 0, 0]);
  const objectRef = useRef<THREE.Mesh>(null);
  const { camera, size } = useThree();

 useEffect(() => {
  const handleMouseMove = (event: MouseEvent) => {
    if (!objectRef.current) return;
    
    const ndcX = (event.clientX / size.width) * 2 - 5;
    const ndcY = -(event.clientY / size.height) * 2 + 5;
    updatePosition(ndcX, ndcY);
  };

  const handleTouchMove = (event: TouchEvent) => {
    if (!objectRef.current || !event.touches[0]) return;
    
    const touch = event.touches[0];
    const ndcX = (touch.clientX / size.width) * 2 - 1;
    const ndcY = -(touch.clientY / size.height) * 2 + 1;
    updatePosition(ndcX, ndcY);
  };

  const updatePosition = (ndcX: number, ndcY: number) => {
    const desiredZ = -8;
    const ndcPosition = new THREE.Vector3(ndcX, ndcY, 0.5);
    
    ndcPosition.unproject(camera);
    const direction = ndcPosition.sub(camera.position).normalize();
    const distance = (desiredZ - camera.position.z) / direction.z;
    const worldPosition = camera.position.clone().add(direction.multiplyScalar(distance));

    if (rigidBodyRef.current) {
      rigidBodyRef.current.setTranslation({
        x: worldPosition.x,
        y: worldPosition.y,
        z: desiredZ,
      }, true);
    }
  };

  window.addEventListener("mousemove", handleMouseMove);
  window.addEventListener("touchmove", handleTouchMove);

  return () => {
    window.removeEventListener("mousemove", handleMouseMove);
    window.removeEventListener("touchmove", handleTouchMove);
  };
}, [camera, size]);

  

  return (
    <RigidBody 
        type="kinematicPosition"
        colliders="ball"
        mass={50}
        restitution={0.5}
        friction={0.5}
        ref={rigidBodyRef}
        sensor={false}>
        <mesh ref={objectRef}>
          {/* <boxGeometry args={[1, 1, 1]} /> */}
          {/* <meshStandardMaterial color="orange" /> */}
          <BallCollider args={[1]}/>
        </mesh>
    </RigidBody>
  );
}

export default ParticlesIntro;