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
      className='w-32 h-16 cursor-pointer rounded-lg bg-sky-400 flex justify-center'
      onClick={onClick}
    >
      <h3 className='absolute z-50 translate-y-1/2 text-2xl font-bold text-black'>{btnTitle}</h3>
      <div className='w-36 h-12 rounded-t-lg bg-white rounded-to opacity-35'/>
      <div />
    </motion.div>
  )
}

export default BtnDeshboard



    {/* <div 
      className="relative cursor-pointer w-36 h-16 z-40" 
      onClick={onClick}
      onMouseEnter={() => setHover(() => true)}
      onMouseLeave={() => setHover(() => false)}
      // onMouseDown={() => setIsClicked(() => !isClicked)}
    >
        <img src={srcColor} className={hover ? colorHover : color}/>
        <img src={srcImg} className='absolute object-contain'/>
    </div> */}