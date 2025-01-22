'use client'
import { useSoundStore } from "../store/Store"
import { GiSoundOn } from "react-icons/gi";
import { GiSoundOff } from "react-icons/gi";


const SoundButton = () => {

    const { sound } = useSoundStore();


   const soundToggleHandler = () => {
    sound.setToggleSound();
   }

  return (
    <button 
          className='
            absolute z-[100] 
            w-10 
            md:w-14
            h-10 
            md:h-14 
            top-12 
            md:top-10
            right-5 rounded-full 
            bg-gray-600 
            hover:bg-gray-700 
            border 
            flex 
            justify-center 
            items-center'
          onClick={soundToggleHandler}
        >
            {sound.isSoundPlaying ? <GiSoundOn className="w-8 h-8 text-gray-400"/> : <GiSoundOff className="w-8 h-8 text-gray-400"/>}
        </button>
  )
}

export default SoundButton