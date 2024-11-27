import { InstancedMesh } from "three"
import { easeIn, motionValue, useAnimation } from "framer-motion"
import {motion} from 'framer-motion-3d'
import { useEffect, useRef, useState } from "react"
import { Torus } from "@react-three/drei"
import { useFrame } from "@react-three/fiber"

// type EngineFireType = {
//     fireList: string[],
//     setFireList(): void
// }


const EngineFire = () => {

    const [fireList, setFireList] = useState<string[]>([])

    useEffect(() => {

        const intervalAdd = setInterval(() => {
            setFireList(prev => ([...prev, '*']))
        }, 200)

        const removeInterval = setTimeout(() => {
            setInterval(() => {
              setFireList(prev => prev.slice(0, -1));
            }, 8000);
          }, 1400);

        return(() => {
            clearInterval(intervalAdd)
            clearInterval(removeInterval)
        })
    }, [])


  return (
    <>
    {fireList.map(element => (
        <Model />
    ))}
    </>
  )
}

export default EngineFire

const Model= () => {

  const [color, setColor] = useState('red');
  const controls = useAnimation();

  
  
  useEffect(() => {
    // const updateColor = (latest) => {
    //     if (latest.color) {
    //       setColor(latest.color);
    //     }
    //   };

    //   const externalColorSource = {
    //     update: (newColor) => updateColor({ color: newColor })
    //   };
  
    //   // Example of triggering color change
    //   const colorChangeTimeout = setTimeout(() => {
    //     externalColorSource.update('#00ff00');
    //   }, 1000);


    controls.start({
        z: 12,
        scale: [1, 0.2],
        color: ['#FF5733', '#49dae1'],
        transition: {
            scale: {
                duration: 2,
                ease: easeIn,
                times: [0, 0.75]
            },
            color: {
                duration: 2,
                ease: easeIn,
                times: [0, 1]    
            },
            duration: 2,
            ease: easeIn
        }
    }) 

    // return () => clearTimeout(colorChangeTimeout);
  }, [])


  return (
    <motion.group position={[6.35, 2.05, -3.5]} scale={1} animate={controls}>
        <mesh >
            <torusGeometry args={[0.6, 0.1, 12, 12]} />
            <meshBasicMaterial transparent={true} opacity={1} color={color}/>
        </mesh>
    </motion.group>
  )
}

