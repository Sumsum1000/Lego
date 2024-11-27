'use client';
import { InstancedRigidBodies, RapierRigidBody, Physics, RigidBody, CuboidCollider, BallCollider } from "@react-three/rapier";
import { useEffect, useRef, useMemo, Suspense, useState,  } from "react";

import { Box, OrbitControls, Torus, useGLTF, Instances, Environment, PerspectiveCamera, useTexture, Sphere } from "@react-three/drei";
import { Canvas, useLoader, useFrame, useThree } from "@react-three/fiber";
import { clone } from 'three/examples/jsm/utils/SkeletonUtils.js';
//import { InstancedMesh } from "three";
import * as THREE from 'three';
import { Perf } from "r3f-perf";
import { useClickStore } from "./store/Store";




const COUNT = 500;

function degreesToRadians(degrees: number): number {
  return degrees * (Math.PI / 180);
}

const vectorsCreator = () => {
  const vectors = [];
  for(let i=0; i<600; i++){
    const x = Math.random() * 10 -5;
    const y = Math.random() * 20 + 10;
    const z = Math.random() * -1 - 8;
    const vector = new THREE.Vector3(x, y, z);
    vectors.push(vector);
  }
  return vectors;
}

const vectors = vectorsCreator();


export function ParticlesIntro() {

  return (
    <main className="h-screen w-screen bg-gray-600 flex justify-center">
     
      <Canvas className="h-full bg-gray-800"  shadows>
      <Perf className='top-left'/>
        <Physics  gravity={[0, -9.1 , 0]} >
           {vectors.map((vector, i) => (
            <RigidBody 
                key={i} 
                scale={0.185} 
                colliders='cuboid' 
                mass={0.5}
                restitution={0.5}
                friction={0.2}
                rotation={[
                  Math.random() * degreesToRadians(360),
                  Math.random() * degreesToRadians(360),
                  Math.random() * degreesToRadians(360)
                ]} 
                position={vector.toArray()}
             >
                <instancedMesh  args={[undefined, undefined, 600]}>
                    {/* <sphereGeometry args={[3, 24, 24]}/>
                    <meshBasicMaterial color='yellow'/> */}
                    {/* ------------------------------------------------------- */}
                    <Model />
                </instancedMesh>
            </RigidBody>
           ))}
             {/* Floor */}
             <RigidBody type="fixed" colliders='cuboid' position={[150, -1, 50]}>
            {/* <Box args={[600, 2, 260]} position={[0, -2, 0]}>
              <meshBasicMaterial color='red'/>
            </Box> */}
              <CuboidCollider args={[400, 2, 260]} position={[0, -2, 0]}/>
          </RigidBody>

          {/* Front wall */}
          <RigidBody type="fixed" colliders='cuboid'>
            {/* <Box args={[12, 4, 0.2]} position={[0, -2, -7]}>
              <meshBasicMaterial color='white'/>
            </Box> */}
             <CuboidCollider args={[6, 2, 0.2]} position={[0, -2, -7]}/>
          </RigidBody>

          {/* Back wall */}
          <RigidBody type="fixed" colliders='cuboid'>
            {/* <Box args={[12, 4, 0.2]} position={[0, -2, -10]}>
              <meshBasicMaterial color='salmon'/>
            </Box> */}
               <CuboidCollider args={[6, 2, 0.2]} position={[0, -2, -10]}/>
          </RigidBody>

          {/* Right wall */}
          <RigidBody type="fixed" colliders='cuboid'>
            {/* <Box args={[0.2, 4, 3]} position={[6, -2, -8.5]}>
              <meshBasicMaterial color='yellow'/>
            </Box> */}
             <CuboidCollider args={[0.2, 2, 1.5]} position={[6, -2, -8.5]}/>
          </RigidBody>

          {/* Left wall */}
          <RigidBody type="fixed" colliders='cuboid'>
            {/* <Box args={[0.2, 4, 3]} position={[-6, -2, -8.5]}>
              <meshBasicMaterial color='yellow'/>
            </Box> */}
             <CuboidCollider args={[0.2, 2, 1.5]} position={[-6, -2, -8.5]}/>
          </RigidBody>
             <CursorFollower />

        </Physics>  

        <Box />
        {/* <OrbitControls /> */}
        {/* <Environment preset="lobby" background={false}/> */}
        {/* <PerspectiveCamera fov={120} makeDefault position={[0, 0, -20]}/> */}
        <mesh position={[2, 3, -9]}>
          <pointLight color={'#6fc0d9'} intensity={120} />
          {/* <sphereGeometry args={[0.3, 12, 12]}/> */}
        </mesh>
        <ambientLight intensity={0.5}/>
        <PerspectiveCamera 
          makeDefault 
          position={[0, 1.75, -4]} 
          fov={75}
          // rotation={[-Math.PI / 4, 0, 0]}
        />
 
      </Canvas>
     
    </main>
  );
}



export function Model({ color = 'white', roughness = 0, ...props }) {

  const diffuseMap = useTexture('/RedPiece.jpg')
  const ref = useRef()
  const { nodes, materials, scene } = useGLTF('/RedPiece_01.glb')
  const clonedScene = useMemo(() => clone(scene), [scene]);
  const newMat = new THREE.MeshStandardMaterial({
    color: 'red',
    roughness: 0.65,
    map: diffuseMap
  })

  clonedScene.traverse((child) => {
  
    if (child instanceof THREE.Object3D && (child as any).isMesh) {
      child.castShadow = true;
      child.receiveShadow = true;
      const mesh = child as THREE.Mesh;
      mesh.material = newMat;
    }
  });

  useEffect(() => {

    if (diffuseMap) {
     diffuseMap.flipY = false;
     diffuseMap.colorSpace = 'srgb'
     diffuseMap.needsUpdate = true;
    }     
}, [])
  

  return (
    <primitive 
        object={clonedScene}  
        ref={ref}
    />
  )
}


function CursorFollower() {
  const rigidBodyRef = useRef<RapierRigidBody>(null); // Type the ref correctly
  //const previousPosition = useRef([0, 0, 0]);
  const objectRef = useRef<THREE.Mesh>(null);
  const { camera, size } = useThree();

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (!objectRef.current) return;

      // Convert screen position to normalized device coordinates (NDC)
      const ndcX = (event.clientX / size.width) * 2 - 1;
      const ndcY = -(event.clientY / size.height) * 2 + 1;

      // Define the desired z position of the object
      const desiredZ = -8;

      // Create a 3D vector for the mouse position in NDC
      const ndcPosition = new THREE.Vector3(ndcX, ndcY, 0.5);

      // Unproject to get world coordinates at the desired Z
      ndcPosition.unproject(camera);
      const direction = ndcPosition.sub(camera.position).normalize();
      const distance = (desiredZ - camera.position.z) / direction.z;
      const worldPosition = camera.position.clone().add(direction.multiplyScalar(distance));

      // Update the object's position
      //objectRef.current.position.set(worldPosition.x, worldPosition.y, desiredZ);

      if (rigidBodyRef.current) { 
        rigidBodyRef.current.setTranslation({ 
          x: worldPosition.x, 
          y: worldPosition.y, 
          z: desiredZ, 
        }, true); 
      }
      
    };

    

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [camera, size]);

  

  return (
    <RigidBody 
        type="kinematicPosition"
        colliders="ball"
        mass={5}
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
