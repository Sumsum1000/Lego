import React from 'react'
import { useEffect, useRef, useState } from 'react'
import Link from 'next/link';
import {motion} from 'framer-motion';
import { useClickStore } from '../store/Store';


const Logo = () => {

const [isHover, setIsHover] = useState(false);
const [isAnimLoop, setIsAnimLoop] = useState(false);
const logo = "/Logo.jpg"
const controls = useRef<HTMLParagraphElement | null>(null);
const clickStore = useClickStore();
const {setIsStartButton, isStartButton} = clickStore;

const hoverStyleOn = 'font-KirangHaerang inline-block text-5xl self-center mt-36 text-yellow-300';
const hoverStyleOff = 'font-KirangHaerang inline-block text-5xl self-center mt-36 text-green-300';

const startVariant = {
  init: {
    opacity: [0, 1],
    transition: {
      times: [0, 1],
      duration: 2
    }
  },
  anim: {
    opacity: 1,
    transition: {
      duration: 2
    }
  },
  loop: {
    scale: [1, 1.1, 1],
    opacity: [0.5, 1, 0.5],
    transition: {
      ease: "easeIn",
      repeat: Infinity,
      duration: 3
    }
  }
}

const startVariant2 = {
  init: {
    opacity: 0
  },
  anim: {
    opacity: 1,
    transition: {
      duration: 3
    }
  },
  loop: {
    scale: [1, 1.1, 1],
    opacity: [0.5, 1, 0.5],
    transition: {
      ease: "easeIn",
      repeat: Infinity,
      duration: 3
    }
  }
}



  useEffect(() => {

    const delayStartButton = setTimeout(() => {
      setIsStartButton(true);
    }, 4000)

    return(() => {
      clearTimeout(delayStartButton)
    })
  },[])

  return (
    <div className=" h-[12%]  z-10 absolute top-[15%] flex flex-col items-center">
        <div className="w-full h-full  flex flex-row ">
            <img className='h-full' src={logo}/>
            <div className='w-full h-full flex flex-col justify-between items-end ml-7'>
                <img src='LegoBrick.jpg' className='h-1/2'/>  
                <p  className="font-KirangHaerang text-[280%] text-yellow-100 font-bold p-0 m-0 mt-4 tracking-widest" >#75384</p>
            </div>
        </div>
        {isStartButton && <Link href='instructions' >
          <motion.p 
                // ref={controls} 
                className={isHover ? hoverStyleOff : hoverStyleOn}
                variants={startVariant2}
                initial='init'
                animate={isAnimLoop ? 'loop' : 'anim'}
                onHoverStart={() => setIsHover(true)}
                onHoverEnd={() => setIsHover(false)}
                onAnimationComplete={() => setIsAnimLoop(true)}
          >Start</motion.p>
        </Link>}
    </div>
  )
}

export default Logo;