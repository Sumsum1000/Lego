'use client'

import Link from "next/link";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import Logo from "./components/Logo/Logo";
import ParticlesIntro from "./components/ParticlesIntro";
import { Suspense } from "react";
import {motion, useAnimation} from 'framer-motion';
import Bullet from "./components/bullet/Bullet";


export default function Home() {
  return (
    <div className="h-screen w-screen bg-gray-800 flex justify-center">
       <Logo />
       {/* <Suspense fallback={<p>Wait for it... its falling</p>}>
          <ParticlesIntro />
       </Suspense> */}
       <Test />
    </div>
  );
}


const Test = () => {

  const controls = useAnimation()
  // Start animation on button click
  // const handleClick = () => {
  //   controls.start({ y: 200, opacity: 0, transition:{duration:1} })
  // }

  const handleClick = () => {
    controls.start({ 
      y: [0, 100, 50, 200],      // Move down with bouncing effect
      opacity: [1, 0.5, 0.8, 0],  // Fade out with varying opacity
      transition: {
        duration: 2,
        times: [0, 0.1, 0.8, 1]  // Timing for each keyframe (must be between 0-1)
      }
    })
  }

  return(
    <>
      <motion.div animate={controls} ><h1>ghfgthjftjthj</h1></motion.div>
      <button onClick={handleClick}>Animate</button>
    </>
  )
}
