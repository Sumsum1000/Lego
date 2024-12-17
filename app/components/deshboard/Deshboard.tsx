import {motion} from 'framer-motion'
import BtnDeshboard from "./BtnDeshboard"
import { DeshboardBtnType } from '@/app/utils/Types'


const Deshboard = ({onClickHandlers}: DeshboardBtnType) => {

    const buttons = [
        { srcColor: "/BtnColor.png", srcImg: "/btnEngine.png" },
        { srcColor: "/BtnColor.png", srcImg: "/btnFire.png" },
      ];

  return (
    <motion.div drag dragMomentum={false} className="cursor-grabbing absolute w-[10%] h-[40%] z-20 flex flex-row justify-center">
       <div className="absolute w-full h-full flex justify-center">
            <img  src='/Deshboard.png' className="h-full"/>
       </div>
       <div className="relative flex flex-col space-y-7 top-10 right-1">
            {buttons.map((btn, index) => (
          <BtnDeshboard
            key={index}
            srcColor={btn.srcColor}
            srcImg={btn.srcImg}
            onClick={onClickHandlers[index]} // Use the onClickHandlers array
          />
        ))}
        </div>
    </motion.div>
  )
}

export default Deshboard


{/* <BtnDeshboard srcColor="/BtnColor.png" srcImg="/btnEngine.png" onClick={onClickHandlers[0]}/>
<BtnDeshboard srcColor="/BtnColor.png" srcImg="btnFire.png" onClick={onClickHandlers[1]}/> */}