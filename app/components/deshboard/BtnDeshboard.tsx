import { DeshboardType } from "@/app/utils/Types"

const BtnDeshboard = ({srcImg, srcColor, onClick}: DeshboardType) => {
  return (

    <div className="relative w-36 h-16 z-40" onClick={onClick}>
        <img src={srcColor} className='absolute object-contain z-50 mix-blend-color'/>
        <img src={srcImg} className='absolute object-contain'/>
    </div>

  )
}

export default BtnDeshboard