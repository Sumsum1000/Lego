import React, {Suspense, useState} from 'react'
import { Model } from '../../models3D/Models3D'
import { Position, Rotation, Scale, MaterialType } from '@/app/utils/Types';
import { LevelProps } from '@/app/utils/Types';
import { LevelBlock } from '../../level/LevelBlock';
import { level1 } from '../../levelsData/Level1';
import { level2 } from '../../levelsData/level2';
import { level3 } from '../../levelsData/level3';
import { level4 } from '../../levelsData/level4';
import { level5 } from '../../levelsData/level5';
import { level6 } from '../../levelsData/level6';
import { level7 } from '../../levelsData/level7';

//import {Variants } from 'framer-motion';
//import { ModelProps} from '../../models3D/Models3D';

export const Level7 = ({isLeftArrowClicked,level, isActive}: LevelProps) => {
  

  const numOfElements = level7.length;
  //const [isActive, setIsActive] = useState(true)


  return   (
    <>
        <LevelBlock
          levelData={level1}
          isLeftArrowClicked={false} 
          isActive={false} 
          level="1"
        />
        <LevelBlock
          levelData={level2}
          isLeftArrowClicked={false} 
          isActive={false} 
          level="2"
        />
        <LevelBlock
          levelData={level3} 
          isLeftArrowClicked={false} 
          isActive={false} 
          level={'3'} 
        />
        <LevelBlock
          levelData={level4} 
          isLeftArrowClicked={false} 
          isActive={false} 
          level={'4'} 
        />
        <LevelBlock
          levelData={level5} 
          isLeftArrowClicked={false} 
          isActive={false} 
          level={'5'} 
        />
        <LevelBlock
          levelData={level6} 
          isLeftArrowClicked={false} 
          isActive={false} 
          level={'6'} 
        />
        <LevelBlock
          levelData={level7} 
          isLeftArrowClicked={isLeftArrowClicked} 
          isActive={isActive} 
          level={level} 
        />
    </>
    )
  }