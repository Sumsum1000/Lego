'use client'
import { motion } from 'framer-motion';
import { useSoundStore } from "../store/Store"
import { GiSoundOn } from "react-icons/gi";
import { GiSoundOff } from "react-icons/gi";


const SoundButton = () => {

    const { sound } = useSoundStore();
    const { isSoundPlaying } = sound;


   const soundToggleHandler = () => {
    sound.setToggleSound();
   }

  return (
    <motion.button
      onClick={soundToggleHandler}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`absolute z-[100] top-12 md:top-10 right-5 w-16 md:w-20
      h-10 md:h-14 flex items-center justify-center gap-1.5 rounded-lg
      border border-white/10 shadow-lg backdrop-blur-sm transition-colors
      duration-200 ${isSoundPlaying ? 'bg-sky-400/90' : 'bg-gray-700/80'}`}
    >
      <span
        className={`h-2 w-2 rounded-full transition-colors duration-200 ${
          isSoundPlaying
            ? 'bg-[rgb(128,255,0)] shadow-[0_0_6px_2px_rgba(128,255,0,0.7)]'
            : 'bg-gray-400'
        }`}
      />
      {isSoundPlaying ? (
        <GiSoundOn className="w-5 h-5 md:w-6 md:h-6 text-gray-800" />
      ) : (
        <GiSoundOff className="w-5 h-5 md:w-6 md:h-6 text-gray-200" />
      )}
    </motion.button>
  )
}

export default SoundButton