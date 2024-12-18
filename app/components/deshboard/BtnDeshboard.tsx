import { useEffect, useState } from "react";
import {motion} from 'framer-motion';
import { DeshboardType } from "@/app/utils/Types"

const BtnDeshboard = ({btnTitle, isClicked , onClick}: DeshboardType) => {
  const [hover, setHover] = useState(false);
  //const [isClicked, setIsClicked] = useState(false);

  const colorClick = "w-36 h-16 cursor-pointer rounded-lg bg-orange-600 flex justify-center"
  const colorUnClick = "w-36 h-16 cursor-pointer rounded-lg bg-sky-400 flex justify-center"

  const variantsBtn = {
    init: {
      backgroundColor: "rgb(56, 189, 248)", // bg-sky-400
    },
    anim: {
      backgroundColor: "rgb(251, 146, 60)", // bg-orange-600
      transition: {
        duration: 0.5, // Animation duration of 0.5 seconds
      },
    },
  };


  return (
    <motion.div 
      variants={variantsBtn}
      initial='init'
      animate={isClicked ? "anim" : "init"}
      className={isClicked ? colorClick : colorUnClick}
      onClick={onClick}
      onMouseEnter={() => setHover(() => true)}
      onMouseLeave={() => setHover(() => false)}
      // onMouseDown={() => setIsClicked(() => !isClicked)}
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