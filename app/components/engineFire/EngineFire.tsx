import { MathUtils } from "three";
import { motion } from "framer-motion-3d";
import React, { useRef, useEffect, useState } from "react";
import { useFrame, } from "@react-three/fiber";
import * as THREE from "three";
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







// import { MathUtils } from "three"
// import { easeIn, motionValue, useAnimation } from "framer-motion"
// import {motion} from 'framer-motion-3d'
// import React, { useEffect, useRef, useState } from "react"
// import { Torus } from "@react-three/drei"
// import { dispose, useFrame } from "@react-three/fiber"
// import * as THREE from 'three';

// type EngineFireType = {
//     ringsPosition: [number, number, number],
//     conePosition: [number, number, number],
// }




// const EngineFire = ({ringsPosition, conePosition}: EngineFireType) => {
//     const meshRefs = useRef<React.RefObject<THREE.Mesh>[]>([]);
//     const [fireList, setFireList] = useState<string[]>([]);
//     const MAX_FIRE_ELEMENTS = 8;
  
//     const disposeMesh = (index: number) => {
//       const meshRef = meshRefs.current[index];
//       if (meshRef?.current) {
//         meshRef.current.parent?.remove(meshRef.current);
//         meshRef.current.geometry.dispose();
//         if (Array.isArray(meshRef.current.material)) {
//           meshRef.current.material.forEach((mat: THREE.Material) => mat.dispose());
//         } else {
//           meshRef.current.material.dispose();
//         }
//       }
//     };
  
//     useEffect(() => {
//       const intervalAdd = setInterval(() => {
//         if (fireList.length < MAX_FIRE_ELEMENTS) {
//           setFireList(prev => [...prev, '*']);
//           meshRefs.current.push(React.createRef());
//         } else {
//           disposeMesh(0);
//           setFireList(prev => prev.slice(-1));
//           meshRefs.current.shift();
//         }
//       }, 150);
  
//       return () => clearInterval(intervalAdd);
//     }, []);
  
//     return (
//       <>
//           <mesh position={conePosition} rotation={[MathUtils.degToRad(90), 0, 0]}>
//             <coneGeometry args={[0.2, 9, 8]} />
//             <motion.meshBasicMaterial transparent={true} opacity={0.05} color={'#039be5'} />
//           </mesh>
//           {fireList.map((_, index) => (
//             <Model 
//               key={index}
//               ref={meshRefs.current[index]} 
//               conePosition={conePosition} 
//               ringsPosition={ringsPosition}
//             />
//           ))}
//       </>
//     );
//   };

//   const Model = React.forwardRef<THREE.Mesh, EngineFireType>(
//     ({ringsPosition, conePosition}, ref) => {
//       const meshRef = useRef<THREE.Mesh>(null);
//       //const meshRef2 = useRef<THREE.Mesh>(null);
//       const [color, setColor] = useState('#039be5');
//       const controls = useAnimation();
//       const colorControls = useAnimation();
  
//       useEffect(() => {
//         colorControls.start({
//           color: ['#039be5', '#f4511e'],
//           opacity: [1, 1, 0],
//           transition: {
//             color: { duration: 1, times: [0, 1] },
//             opacity: { duration: 1, times: [0, 0.4, 1] }
//           }
//         });
  
//         controls.start({
//           z: 12,
//           scale: [1, 0.2],
//           transition: {
//             duration: 2,
//             ease: easeIn,
//             times: [0, 0.75]
//           }
//         });
//       }, []);
  
//       return (
//           <motion.group position={ringsPosition} scale={1} animate={controls}>
//             <mesh>
//               <torusGeometry args={[0.6, 0.1, 8, 8]} />
//               <motion.meshBasicMaterial transparent={true} opacity={1} color={color} animate={colorControls}/>
//             </mesh>
//           </motion.group>
//       );
//     }
//   );

//   export default EngineFire;


