import { useEffect, useState } from "react";
import {motion} from 'framer-motion';
import { DeshboardType } from "@/app/utils/Types"

const BtnDeshboard = ({ btnTitle, 
  isClicked, 
  onClick, 
  duration = 0.1,
  onAnimationComplete}: DeshboardType) => {

  const variantsBtn = {
    init: {
      backgroundColor: "rgb(56, 189, 248)", // bg-sky-400
      scale: 1,
    },
    anim: {
      backgroundColor: "rgb(128, 255, 0)", // bg-orange-600
      scale: 1,
      transition: {
        duration: duration, 
      },
    },
  };


  return (
        <motion.div 
      variants={variantsBtn}
      initial="init"
      animate={isClicked ? "anim" : "init"}
      whileHover={{ scale: 1.03 }}
      onAnimationComplete={onAnimationComplete} 
      className='bg-sky-400 w-36 h-16 sm:w-[18] sm:h-[9] 
      md:bg-yellow-500 md:w-36 md:h-16 
      cursor-pointer rounded-lg flex justify-center'
      onClick={onClick}
    >
      <h3 className='absolute z-50 translate-y-1/2 text-2xl md:text-lg sm:text-sm font-bold text-black'>{btnTitle}</h3>
      <div className='w-36 h-12 rounded-lg bg-white rounded-to opacity-30'/>
      <div />
    </motion.div>

  )
}

export default BtnDeshboard
