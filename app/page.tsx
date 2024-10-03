'use client'

import Link from "next/link";
import Test from "./components/test/Test";
import { LevelTest } from "./components/levels/levelTest/levelTest";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import Lights from "./components/lights";

export default function Home() {
  return (
    <div className="h-screen  bg-gray-400">
       <Link href='instructions'>Start</Link>
    </div>
  );
}
