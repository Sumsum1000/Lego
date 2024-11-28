import { InstancedMesh, MathUtils } from "three"
import { easeIn, motionValue, useAnimation } from "framer-motion"
import {motion} from 'framer-motion-3d'
import { useEffect, useRef, useState } from "react"
import { Torus } from "@react-three/drei"
import { useFrame } from "@react-three/fiber"

type EngineFireType = {
    ringsPosition: [number, number, number],
    conePosition: [number, number, number],
}


const EngineFire = ({ringsPosition, conePosition}: EngineFireType) => {

    const [fireList, setFireList] = useState<string[]>([])
    const MAX_FIRE_ELEMENTS = 8;

    useEffect(() => {

        const intervalAdd = setInterval(() => {
            setFireList(prev => ([...prev, '*']))
        }, 200)

        const removeInterval = setTimeout(() => {
            setInterval(() => {
              setFireList(prev => prev.slice(-7));
            }, 2000);
          }, 1000);

        return(() => {
            clearInterval(intervalAdd)
            clearInterval(removeInterval)
        })
    }, [])


  return (
    <>
    {fireList.map(element => (
        <Model conePosition={conePosition} ringsPosition={ringsPosition}/>
    ))}
    </>
  )
}

export default EngineFire

const Model= ({ringsPosition, conePosition}: EngineFireType) => {

  const [color, setColor] = useState('#039be5');
  const controls = useAnimation();
  const colorControls = useAnimation();

  
  
  useEffect(() => {

    colorControls.start({
        color:['#039be5', '#f4511e'],
        opacity: [1, 1, 0],
        transition: {
            color: {
                duration: 1,
                times: [0, 1]
            },
            opacity: {
                duration: 1,
                times: [0, 0.4, 1]
            }
        }
    })


    controls.start({
        z: 12,
        scale: [1, 0.2],
        transition: {
            duration: 2,
                ease: easeIn,
                times: [0, 0.75]
        }
    }) 

    // return () => clearTimeout(colorChangeTimeout);
  }, [])


  return (
    <>
            <mesh position={conePosition} rotation={[MathUtils.degToRad(90), 0, 0]}>
                <coneGeometry args={[0.2, 9, 8]} />
                <motion.meshBasicMaterial transparent={true} opacity={0.05} color={color} />
            </mesh>
        <motion.group position={ringsPosition} scale={1} animate={controls}>
            <mesh >
                <torusGeometry args={[0.6, 0.1, 8, 8]} />
                <motion.meshBasicMaterial transparent={true} opacity={1} color={color} animate={colorControls}/>
            </mesh>
        </motion.group>
    </>
  )
}

// rings position={[6.35, 2.05, -3.5]}
// fire [6.35, 2.05, -0.7]

