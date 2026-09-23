import { Canvas } from '@react-three/fiber'
import { motion } from 'framer-motion'
import ControllerModel from './ControllerModel'
import { DeshboardBtnType } from "../../utils/Types"

const Deshboard = ({onClickHandlers}: DeshboardBtnType) => {

  const handleEngineClick = () => {
    onClickHandlers[0] && onClickHandlers[0]();
  };

  const handleFireClick = () => {
    onClickHandlers[1] && onClickHandlers[1]();
  };

  return (
    <motion.div
      drag
      dragMomentum={false}
      className="cursor-grab active:cursor-grabbing absolute bottom-5 left-5 h-[700px] w-[350px] xl:w-[450px] xl:h-[900px] md:h-[700px] md:w-[350px] sm:h-[700px] sm:w-[350px] z-[60]"
    >
      <Canvas camera={{ position: [0, 0, 5], fov: 35 }}>
        <ambientLight intensity={0.7} />
        <directionalLight position={[2, 3, 4]} intensity={1.2} />
        <directionalLight position={[-2, -1, -3]} intensity={0.3} />
        <ControllerModel onEngineClick={handleEngineClick} onFireClick={handleFireClick} />
      </Canvas>
    </motion.div>
  )
}

export default Deshboard
