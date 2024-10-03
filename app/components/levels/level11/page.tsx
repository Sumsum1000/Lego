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
import { level8 } from '../../levelsData/level8';
import { level9 } from '../../levelsData/level9';
import {level10} from '../../levelsData/level10';
import {level11} from '../../levelsData/level11';

//import {Variants } from 'framer-motion';
//import { ModelProps} from '../../models3D/Models3D';

export const Level11 = ({isLeftArrowClicked,level, isActive}: LevelProps) => {
  

  const numOfElements = level11.length;
  //const [isActive, setIsActive] = useState(true)


  return(
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
          isLeftArrowClicked={false} 
          isActive={false} 
          level={'7'} 
        />
        <LevelBlock
          levelData={level8} 
          isLeftArrowClicked={false} 
          isActive={false} 
          level={'8'} 
        />
        <LevelBlock
          levelData={level9} 
          isLeftArrowClicked={false} 
          isActive={false} 
          level={'9'} 
        />
          <LevelBlock
          levelData={level10} 
          isLeftArrowClicked={false} 
          isActive={false} 
          level={'10'} 
        />
        <LevelBlock
          levelData={level11} 
          isLeftArrowClicked={isLeftArrowClicked} 
          isActive={isActive} 
          level={level} 
        />
    </>
  )
}