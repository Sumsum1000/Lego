import { useEffect, useState } from 'react'
import {motion} from 'framer-motion'
import BtnDeshboard from "./BtnDeshboard"
import { DeshboardBtnType } from '@/app/utils/Types'


const Deshboard = ({onClickHandlers}: DeshboardBtnType) => {
    const [isClicked, setIsClicked] = useState<boolean[]>([false, false]); 
    const [buttonStates, setButtonStates] = useState([
      { 
        isClicked: false, 
        className: "initial-class-for-first-button" 
      },
      { 
        isClicked: false, 
        className: "initial-class-for-second-button" 
      }
    ]);

    const handleButtonClick = (index: number) => {
      setIsClicked((prev) => 
        prev.map((clicked, i) => (i === index ? !clicked : clicked))
      );
      onClickHandlers[index] && onClickHandlers[index]();
    };

    const buttons = [
        { btnTitle: 'Engine'},
        { btnTitle: 'Fire'},
      ];

      useEffect(() => {
        console.log(isClicked)
      }, [isClicked])

  return (
    <motion.div drag dragMomentum={false} className="cursor-grabbing absolute w-[10%] h-[40%] z-20 flex flex-row justify-center">
       <div className="absolute w-full h-full flex justify-center">
            <img  src='/Deshboard.png' className="h-full"/>
       </div>
       <div className="relative flex flex-col space-y-7 top-10 right-1">
            {buttons.map((btn, index) => (
            <BtnDeshboard
              key={index}
              isClicked={isClicked[index]}
              btnTitle={btn.btnTitle}
              //onClick={onClickHandlers[index]} // Use the onClickHandlers array
              onClick={() => handleButtonClick(index)}
            />
            ))}
        
          </div>
    </motion.div>
  )
}

export default Deshboard


{/* <BtnDeshboard srcColor="/BtnColor.png" srcImg="/btnEngine.png" onClick={onClickHandlers[0]}/>
<BtnDeshboard srcColor="/BtnColor.png" srcImg="btnFire.png" onClick={onClickHandlers[1]}/> */}