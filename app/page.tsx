'use client';
import Logo from "./components/Logo/Logo";
import { Suspense } from "react";
//import ParticlesIntro from "./components/ParticlesIntro";
import ParticlesIntroOriginal from "./components/ParticlesIntroOriginal";

import PTest from "./components/PTest";
import ParticlesIntro_v3 from "./components/ParticlesIntro_v3";
import ParticlesIntro from "./components/ParticlesIntro";
import ParticlesIntro_v4 from "./components/ParticlesIntro_v4";


export default function Home() {
  return (
    <div className="h-screen bg-gray-800 flex justify-center overflow-hidden">
       <Logo />
       <LoaderText />
       <Suspense fallback={null}>
          {/* <ParticlesIntroOriginal /> */}
          {/* <ParticlesIntroCopy /> */}
          {/* <PTest /> */}
          {/* <ParticlesIntro_v3 /> */}
          {/* <ParticlesIntro /> */}
       </Suspense>
    </div>
  );
}

const LoaderText = () => {
  return (
    <p className='absolute top-[35%] text-[260%] font-KirangHaerang'>
      Wait for it... its falling
    </p>
  );
};
