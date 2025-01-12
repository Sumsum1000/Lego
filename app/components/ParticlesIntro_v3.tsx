import React, { useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import { Instances, Instance } from '@react-three/drei';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';


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


export function ParticlesIntro_v3() {
  const gltf = useGLTF('/RedPiece_01.glb') as any;
  const geometry = gltf.nodes.Object039.geometry; // Adjust to match your GLTF structure

  // Generate random positions
  const particles = useMemo(() => {
    const count = 50;
    return Array.from({ length: count }, () => ({
      position: [
        (Math.random() - 0.5) * 20, // Random X 
        (Math.random() - 0.5) * 20, // Random Y
        (Math.random() - 0.5) * 20, // Random Z
      ],
      scale: Math.random() * 0.5 + 0.5, // Random scale
    }));
  }, []);

  return (
    <main className="h-screen w-screen bg-gray-600 flex justify-center">
      <Canvas className="h-full bg-gray-800" shadows>
        {/* Ambient and directional lights */}
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1} castShadow />

        {/* Instanced geometry */}
        <Instances limit={50} geometry={geometry} castShadow receiveShadow>
          <meshStandardMaterial color="orange" />
          {particles.map((particle, index) => (
            <Instance
              key={index}
              position={particle.position}
              scale={0.2}
            />
          ))}
        </Instances>
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
    
    const ndcX = (event.clientX / size.width) * 2 - 1;
    const ndcY = -(event.clientY / size.height) * 2 + 1;
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

export default ParticlesIntro_v3;
