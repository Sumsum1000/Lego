export type BtnDeshboardType = {
    srcImg: string,
    srcColor: string
}

const BtnDeshboard = ({srcImg, srcColor}: BtnDeshboardType) => {
  return (
    <div className="relative w-36 h-16 z-40">
        <img src={srcColor} className='absolute object-contain z-50 mix-blend-color'/>
        <img src={srcImg} className='absolute object-contain'/>
    </div>
  )
}

export default BtnDeshboard