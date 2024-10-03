import React, {Suspense, useState} from 'react'
//import { Model } from '../../models3D/Models3D'
import { Position, Rotation, Scale, MaterialType } from '@/app/utils/Types';
import { LevelProps } from '@/app/utils/Types';
//import { LevelBlock } from '../../level/LevelBlock';
import { Level1 } from './level1/page';
import { Level2 } from './level2/page';
import { Level3 } from './level3/page';



export const LevelAll = ({isLeftArrowClicked,level, isActive}: LevelProps) => {
  

  //const numOfElements = level16.length;
  const [isLeftArrowClicked_, setIsLeftArrowClicked_] = useState(true);
  const [currentLevel, setCurrentLevel] = useState(3);
  
  //const [isActive, setIsActive] = useState(true)


  return(
    <>
        {currentLevel >= 1 && 
         <Level1
            isLeftArrowClicked={isLeftArrowClicked_} 
            isActive={currentLevel !== 1 ? false : true} 
            level={'1'} 
            shouldAnimate={true}
          />
        }
        {currentLevel >= 2 &&
          <Level2
            isLeftArrowClicked={isLeftArrowClicked_} 
            isActive={currentLevel !== 2 ? false : true} 
            level={'2'} 
            shouldAnimate={true}
          />
        }
        {currentLevel >= 3 &&
          <Level3
            isLeftArrowClicked={isLeftArrowClicked_} 
            isActive={currentLevel !== 3 ? false : true} 
            level={'3'} 
            shouldAnimate={true}
          />
        }
    </>
  )
}