import { useState } from "react";
import { DeshboardType } from "@/app/utils/Types"

const BtnDeshboard = ({srcImg, srcColor, onClick}: DeshboardType) => {
  const [hover, setHover] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  const color = "absolute object-contain z-30 mix-blend-color"
  const colorHover = "absolute object-contain z-30 mix-blend-color opacity-60"

  return (

    <div 
      className="relative cursor-pointer w-36 h-16 z-40" 
      onClick={onClick}
      onMouseEnter={() => setHover(() => true)}
      onMouseLeave={() => setHover(() => false)}
      onMouseDown={() => setIsClicked(() => !isClicked)}
    >
        <img src={srcColor} className={hover ? colorHover : color}/>
        <img src={srcImg} className='absolute object-contain'/>
    </div>

  )
}

export default BtnDeshboard