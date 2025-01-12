'use client';
import Logo from "./components/Logo/Logo";
import { Suspense } from "react";
//import ParticlesIntro from "./components/ParticlesIntro";
import ParticlesIntro from "./components/ParticlesIntro";


export default function Home() {
  return (
    <div className="h-screen bg-gray-800 flex justify-center overflow-hidden">
       <Logo />
       
       <Suspense fallback={<LoaderText />}>
          <ParticlesIntro />
       </Suspense>
    </div>
  );
}

const LoaderText = () => {
  return (
    <p className='absolute z-20 top-[40%] text-[150%] md:text-[250%] font-KirangHaerang'>
      Wait for it... its falling
    </p>
  );
};
