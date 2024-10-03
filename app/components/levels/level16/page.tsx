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
import { level10 } from '../../levelsData/level10';
import { level11 } from '../../levelsData/level11';
import { level12 } from '../../levelsData/level12';
import { level13 } from '../../levelsData/level13';
import { level14 } from '../../levelsData/level14';
import { level15 } from '../../levelsData/level15';
import { level16 } from '../../levelsData/level16';

//import {Variants } from 'framer-motion';
//import { ModelProps} from '../../models3D/Models3D';


export const Level16 = ({isLeftArrowClicked,level, isActive}: LevelProps) => {
  

  const numOfElements = level16.length;
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
          isLeftArrowClicked={false} 
          isActive={false} 
          level={'11'} 
        />
        <LevelBlock
          levelData={level12} 
          isLeftArrowClicked={false} 
          isActive={false} 
          level={'12'} 
        />
         <LevelBlock
          levelData={level13} 
          isLeftArrowClicked={false} 
          isActive={false} 
          level={'13'} 
        />
        <LevelBlock
          levelData={level14} 
          isLeftArrowClicked={false} 
          isActive={false} 
          level={'14'} 
        />
        <LevelBlock
          levelData={level15} 
          isLeftArrowClicked={false} 
          isActive={false} 
          level={'15'} 
        />
        <LevelBlock
          levelData={level16} 
          isLeftArrowClicked={isLeftArrowClicked} 
          isActive={isActive} 
          level={level} 
        />
    </>
  )
}