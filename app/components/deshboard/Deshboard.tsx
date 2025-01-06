import { useState } from 'react'
import {motion} from 'framer-motion'
import BtnDeshboard from "./BtnDeshboard"
import { DeshboardBtnType } from "../../utils/Types"

const Deshboard = ({onClickHandlers}: DeshboardBtnType) => {

    const [buttonStates, setButtonStates] = useState([
    { 
      index:0,
      isClicked: false, 
      duration: 0.8, 
      onAnimationComplete: () => console.log('Engine'),
    },
    { 
      index: 1,
      isClicked: false, 
      duration: 0,
      onAnimationComplete: () => {
        setButtonStates((prevStates) =>
          prevStates.map((state) =>
            state.index === 1 ? { ...state, isClicked: false } : state
          )
        );
      },
    }
  ]);

  const handleButtonClick = (index: number) => {
    setButtonStates(prev => 
      prev.map((state, i) => 
        i === index 
          ? { ...state, isClicked: !state.isClicked } 
          : state
      )
    );
    onClickHandlers[index] && onClickHandlers[index]();
  };

    const buttons = [
        { btnTitle: 'Engine'},
        { btnTitle: 'Fire'},
      ];


  return (
    <motion.div drag dragMomentum={false} className="cursor-grabbing absolute w-[200px] h-[400px] xl:w-[200px] xl:h-[400px]  md:h-[300px] md:w-[150px]  z-20 flex flex-row justify-center">
       <div className="absolute w-full h-full flex justify-center">
            <img  src='/Deshboard.png' className="object-contain"/>
       </div>
       <div className="relative flex flex-col space-y-7 md:space-y-4 top-10 md:top-10">
            {buttons.map((btn, index) => (
            <BtnDeshboard
                key={index}
                isClicked={buttonStates[index].isClicked}
                btnTitle={btn.btnTitle}
                onClick={() => handleButtonClick(index)}
                duration={buttonStates[index].duration}
                onAnimationComplete={buttonStates[index].onAnimationComplete}
            />
            ))}
          </div>

    </motion.div>
  )
}

export default Deshboard
