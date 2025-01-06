'use client';
import Logo from "./components/Logo/Logo";
import { Suspense } from "react";
import ParticlesIntro from "./components/ParticlesIntro";


export default function Home() {
  return (
    <div className="h-screen bg-gray-800 flex justify-center overflow-hidden">
       <Logo />
       <LoaderText />
       <Suspense fallback={null}>
          <ParticlesIntro />
       </Suspense>
    </div>
  );
}

const LoaderText = () => {
  return (
    <p className='absolute top-[40%] text-5xl font-KirangHaerang'>
      Wait for it... its falling
    </p>
  );
};
