import { MathUtils } from "three";
import { motion } from "framer-motion-3d";
import React, { useEffect, useState } from "react";
import { useAnimation } from "framer-motion";

type EngineFireType = {
    ringsPosition: [number, number, number];
    conePosition: [number, number, number];
  };

const EngineFire = ({ ringsPosition, conePosition }: EngineFireType) => {
    const [fireList, setFireList] = useState<number[]>([]); // Use indices for better tracking
    const MAX_FIRE_ELEMENTS = 8;
  
    useEffect(() => {
      const interval = setInterval(() => {
        setFireList((prev) => {
          const newElement = prev.length ? prev[0] - 1 : 0; // Add a new particle
          const updatedList = [newElement, ...prev]; // Add at the beginning
          if (updatedList.length > MAX_FIRE_ELEMENTS) {
            updatedList.pop(); // Remove the last element if exceeding the limit
          }
          return updatedList;
        });
      }, 150);
  
      return () => clearInterval(interval); // Cleanup interval on component unmount
    }, []);
  
    return (
      <>
        <mesh position={conePosition} rotation={[MathUtils.degToRad(90), 0, 0]}>
          <coneGeometry args={[0.2, 9, 8]} />
          <motion.meshBasicMaterial transparent={true} opacity={0.5} color={"#039be5"} />
        </mesh>
        {fireList.map((id, index) => (
          <Model
            key={id} // Unique key for React rendering
            ringsPosition={[
              ringsPosition[0],
              ringsPosition[1],
              ringsPosition[2] + index * 0.5, // Adjust position dynamically if needed
            ]}
          />
        ))}
      </>
    );
  };
  
  const Model = ({ ringsPosition }: { ringsPosition: [number, number, number] }) => {
    const controls = useAnimation();
  
    useEffect(() => {
      controls.start({
        z: 12,
        scale: [1, 0.2],
        transition: {
          duration: 2,
          ease: "easeIn",
          times: [0, 0.75],
        },
      });
    }, []);
  
    return (
      <motion.group position={ringsPosition} scale={1} animate={controls}>
        <mesh>
          <torusGeometry args={[0.6, 0.1, 8, 8]} />
          <meshBasicMaterial transparent={true} opacity={1} color={"red"} />
        </mesh>
      </motion.group>
    );
  };
  
  export default EngineFire;




