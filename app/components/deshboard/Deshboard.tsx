import {motion} from 'framer-motion'
import BtnDeshboard from "./BtnDeshboard"


const Deshboard = () => {
  return (
    <motion.div drag dragMomentum={false} className="w-[10%] h-[40%] z-20 relative flex flex-row justify-center">
       <div className="absolute w-full h-full flex justify-center">
            <img  src='/Deshboard.png' className="h-full"/>
       </div>
       <div className="relative flex flex-col space-y-7 top-10 right-1">
            <BtnDeshboard srcColor="/BtnColor.png" srcImg="/btnEngine.png"/>
            <BtnDeshboard srcColor="/BtnColor.png" srcImg="btnFire.png"/>
        </div>
    </motion.div>
  )
}

export default Deshboard
