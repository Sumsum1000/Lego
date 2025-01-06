import {motion} from 'framer-motion';
import { DeshboardType } from "../../utils/Types";

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
      className='bg-sky-400  relative flex justify-center
      cursor-pointer rounded-lg  xl:w-[135px] xl:h-[60px] md:w-[100px] md:h-[45px]'
      onClick={onClick}
    >
      <h3 className='absolute z-50 xl:translate-y-1/3 md:translate-y-1/4 xl:text-2xl md:text-lg font-bold text-black'>{btnTitle}</h3>
      <div className='w-[96%] h-3 absolute bottom-0 md: md: rounded-lg bg-white rounded-to opacity-30'/>
      <div />
    </motion.div>

  )
}

export default BtnDeshboard
