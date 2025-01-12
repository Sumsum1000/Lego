
import React, { useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

function degreesToRadians(degrees: number): number {
    return degrees * (Math.PI / 180);
  }

interface ParticleProps {
  position: [number, number, number];
  rotation: [number, number, number];
}

const Particle: React.FC<ParticleProps> = ({ position, rotation }) => {
  const { scene } = useGLTF('/RedPiece_01.glb') as any;

  return <primitive object={scene.clone()} position={position} rotation={rotation}/>;
};

const Particles: React.FC = () => {
  const particleCount = 50;

const particles = Array.from({ length: particleCount }, () => ({
    position: [
      (Math.random() - 0.5) * 20, // X position
      (Math.random() - 0.5) * 20, // Y position
      (Math.random() - 0.5) * 20, // Z position
    ] as [number, number, number],
    rotation: [
        Math.random() * degreesToRadians(360),
        Math.random() * degreesToRadians(360),
        Math.random() * degreesToRadians(360)
    ] as [number, number, number],
  }));

  console.log('particles', particles);

  return (
    <>
      {particles.map((particle, index) => (
        <Particle 
            key={index} 
            position={particle.position} 
            rotation={particle.rotation}
        />
      ))}
    </>
  );
};

const Scene: React.FC = () => {
  return (
    <Canvas camera={{ position: [0, 0, 10], fov: 75 }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <Particles />
    </Canvas>
  );
};

export default Scene;