import React, {Suspense, useState} from 'react'
import { Model } from '../../models3D/Models3D'
import { LevelBlock } from '../../level/LevelBlock';
import { LevelProps } from '@/app/utils/Types';
import { Position, Rotation, Scale, MaterialType } from '@/app/utils/Types';
import { level1 } from '../../levelsData/Level1';
import { level2 } from '../../levelsData/level2';
import { level3 } from '../../levelsData/level3';
import { level4 } from '../../levelsData/level4';
import { level5 } from '../../levelsData/level5';

//import {Variants } from 'framer-motion';
//import { ModelProps} from '../../models3D/Models3D';


const degreesToRadians = (degrees: number) => degrees * (Math.PI / 180);

export const Level5 = ({isLeftArrowClicked,level, isActive}: LevelProps) => {
  

  const numOfElements = level5.length;
  //const [isActive, setIsActive] = useState(true)


  return   (
    <>
    <LevelBlock
       levelData={level1} // Dynamic for Level 3
       isLeftArrowClicked={isLeftArrowClicked} // Dynamic prop
       isActive={false} // Dynamic prop
       level={level} // Ensure level is passed as a string
     />
     <LevelBlock
       levelData={level2} // Dynamic for Level 3
       isLeftArrowClicked={isLeftArrowClicked} // Dynamic prop
       isActive={false} // Dynamic prop
       level={level} // Ensure level is passed as a string
     />
     <LevelBlock
       levelData={level3} // Dynamic for Level 3
       isLeftArrowClicked={isLeftArrowClicked} // Dynamic prop
       isActive={false} // Dynamic prop
       level={level} // Ensure level is passed as a string
     />
       <LevelBlock
         levelData={level4} 
         isLeftArrowClicked={isLeftArrowClicked} 
         isActive={false} 
         level={level} 
       />
       <LevelBlock
         levelData={level5} 
         isLeftArrowClicked={isLeftArrowClicked} 
         isActive={isActive} 
         level={level} 
       />
   </>
  )
}