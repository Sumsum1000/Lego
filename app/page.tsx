'use client'

import Link from "next/link";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
export default function Home() {
  return (
    <div className="h-screen  bg-gray-400">
       <Link href='instructions'>Start</Link>
    </div>
  );
}
