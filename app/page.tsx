'use client'

import Link from "next/link";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import Logo from "./components/Logo/Logo";
import { Suspense } from "react";
import {motion, useAnimation} from 'framer-motion';
import Bullet from "./components/bullet/Bullet";
import ParticlesIntro from "./components/ParticlesIntro";
import Deshboard from "./components/deshboard/Deshboard";
import { useLevelStore } from "./components/store/Store";


export default function Home() {



  return (
    <div className="h-screen w-screen bg-gray-800 flex justify-center">
       <Logo />
       <LoaderText />
       <Suspense fallback={null}>
          {/* <ParticlesIntro /> */}
       </Suspense>
    </div>
  );
}

const LoaderText = () => {
  return(
    <p className="absolute top-[40%] text-5xl font-KirangHaerang">Wait for it... its falling</p>
  )
}



