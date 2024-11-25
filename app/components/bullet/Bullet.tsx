import { Cylinder } from '@react-three/drei';
import React, { useEffect, useRef } from 'react';
import { MathUtils } from 'three';
import { easeIn, useAnimation } from 'framer-motion';
import { motion } from 'framer-motion-3d';
import * as THREE from 'three';

const degreesToRadians = (degrees: number) => degrees * (Math.PI / 180);

const Bullet = () => {
  const meshRef = useRef<any>(null);
  const controls = useAnimation();

  // Move bullet forward
  const moveForward = () => {
    controls.start({
      z: -30,
      transition: {
        z: {
          duration: 1,
          ease: easeIn,
        },
      },
    });
  };

  useEffect(() => {
    moveForward();
  }, []);

  // Cleanup after bullet is removed
  useEffect(() => {
    const timer = setTimeout(() => {
      if (meshRef.current) {
        meshRef.current.parent?.remove(meshRef.current); // Remove from scene
        meshRef.current.geometry.dispose(); // Dispose geometry
        if (Array.isArray(meshRef.current.material)) {
          meshRef.current.material.forEach((mat: THREE.Material) => mat.dispose()); // Dispose materials if array
        } else {
          meshRef.current.material.dispose(); // Dispose single material
        }
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
    {/* <mesh  position={[1.2, 0.2, -14]}>
        <boxGeometry args={[0.64, 0.4, 0.1]}/>
        <meshBasicMaterial color={'yellow'} />
    </mesh> */}
    <motion.mesh
      ref={meshRef}
      position={[1.2, 0.2, -14]}
      rotation={[MathUtils.degToRad(90), 0, 0]}
      animate={controls}
    >
      <cylinderGeometry args={[0.1, 0.1, 1, 12]} />
      <meshBasicMaterial color={'red'} />
    </motion.mesh>
    </>
  );
};

export default Bullet;