import { useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { motion, AnimatePresence } from 'framer-motion'
import ControllerModel from './ControllerModel'
import { DeshboardBtnType } from "../../utils/Types"

const Deshboard = ({onClickHandlers, showHint}: DeshboardBtnType) => {
  const [hintDismissed, setHintDismissed] = useState(false);

  const handleEngineClick = () => {
    onClickHandlers[0] && onClickHandlers[0]();
    setHintDismissed(true);
  };

  const handleFireClick = () => {
    onClickHandlers[1] && onClickHandlers[1]();
    setHintDismissed(true);
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
      <AnimatePresence>
        {showHint && !hintDismissed && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, transition: { delay: 0.5, duration: 1 } }}
            transition={{ duration: 0.5 }}
            className="absolute top-3/4 -mt-[92px] w-full flex flex-col items-center"
          >
            <img
              src="/GrabIcon.png"
              alt=""
              className="w-[5.1rem] h-[5.1rem] md:w-[6.375rem] md:h-[6.375rem] mb-1 [filter:drop-shadow(0_0_4px_rgba(56,189,248,1))_drop-shadow(0_0_18px_rgba(56,189,248,0.9))_drop-shadow(0_0_32px_rgba(56,189,248,0.6))]"
            />
            <p className="text-center text-sky-400 font-bold text-lg md:text-xl drop-shadow-[0_0_8px_rgba(56,189,248,0.6)]">
              Turn on the engine and fire!
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default Deshboard
