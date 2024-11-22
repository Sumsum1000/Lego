'use client'

import Link from "next/link";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import Logo from "./components/Logo/Logo";
import ParticlesIntro from "./components/ParticlesIntro";
export default function Home() {
  return (
    <div className="h-screen w-screen bg-gray-800 flex justify-center">
       <Logo />
       <ParticlesIntro />
    </div>
  );
}
