'use client';
import Logo from "./components/Logo/Logo";
import { Suspense, useEffect, useRef, useState } from "react";
//import ParticlesIntro from "./components/ParticlesIntro";
import ParticlesIntro from "./components/ParticlesIntro";
import AudioPlayer from 'react-h5-audio-player';




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


// const Sound = () => {
//   const audioRef = useRef(null);

//   useEffect(() => {
//     const playAudio = async () => {
//       try {
//         if (audioRef.current) {
//           // Wait for the audio to be loaded
//           await audioRef.current.load()
//           // Play the audio
//           await audioRef.current.play()
//           console.log('Audio started playing')
//         }
//       } catch (error) {
//         console.error('Error playing audio:', error)
//       }
//     }

//     playAudio()
//   }, [])
  
//   return (
//     <audio 
//       ref={audioRef}
//         controls 
//         //src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3"
//         src='/LegoSoundtrek.mp3'
//         autoPlay
//         muted={false}
//     ></audio>
//   );
// }