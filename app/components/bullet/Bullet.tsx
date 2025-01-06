import React, { useEffect, useRef } from 'react';
import { MathUtils } from 'three';
import { useAnimation } from 'framer-motion';
import { motion } from 'framer-motion-3d';
import { BulletType } from '../../utils/Types';


const Bullet = ({position}: BulletType) => {
  const meshRef = useRef<any>(null);
  const controls = useAnimation();

  // Move bullet forward
  const moveForward = () => {
    controls.start({
      z: -30,
      transition: {
        z: {
          duration: 0.3,
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
      meshRef.current?.parent?.remove(meshRef.current);
      meshRef.current.geometry?.dispose();
      if (Array.isArray(meshRef.current.material)) {
        meshRef.current.material?.dispose();
      }
      meshRef.current = null; // Clear reference
    }, 300);

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
      position={position}
      rotation={[MathUtils.degToRad(90), 0, 0]}
      animate={controls}
    >
      <cylinderGeometry args={[0.15, 0.1, 1, 20]} />
      <meshBasicMaterial color={'red'} />
    </motion.mesh>
    </>
  );
};

export default Bullet;



