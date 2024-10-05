import React, {Suspense, useEffect, useState} from 'react'
//import { Model } from '../../models3D/Models3D'
import { Position, Rotation, Scale, MaterialType } from '@/app/utils/Types';
import { LevelProps } from '@/app/utils/Types';
import {useLevelStore} from '../store/Store';
//import { LevelBlock } from '../../level/LevelBlock';
import { LevelBlock } from '../level/LevelBlock';
import { Level1 } from './level1/page';
import { Level2 } from './level2/page';
import { Level3 } from './level3/page';
import { level1 } from '../levelsData/Level1';
import { level2 } from '../levelsData/level2';
import { level3 } from '../levelsData/level3';
import { level4 } from '../levelsData/level4';


export const LevelAll = ({isLeftArrowClicked, level}: LevelProps) => {
  
  const levelStore = useLevelStore();
  const currentStoreLevel = levelStore.currentLevel;
  const [myLevel, setMuyLevel] = useState(0)


  useEffect(() => {
    const timeout = setTimeout(() => {
        setMuyLevel(currentStoreLevel)
    },1500)

    return(() => {
      clearTimeout(timeout);  
    })
  }, [currentStoreLevel])


  return(
    <>
        <LevelBlock
          levelData={level1}
          isLeftArrowClicked={isLeftArrowClicked} 
          isActive={myLevel !== 1 ? false : true} 
          level={level} 
          isVisible={currentStoreLevel >= 1 ? true : false}
        />
        <LevelBlock
          levelData={level2}
          isLeftArrowClicked={isLeftArrowClicked}
          isActive={myLevel !== 2 ? false : true} 
          level={level} 
          isVisible={currentStoreLevel >= 2 ? true : false}
        />
        <LevelBlock
          levelData={level3}
          isLeftArrowClicked={isLeftArrowClicked} 
          isActive={myLevel !== 3 ? false : true} 
          level={level} 
          isVisible={currentStoreLevel >= 3 ? true : false}
        />
        <LevelBlock
          levelData={level4} 
          isLeftArrowClicked={isLeftArrowClicked} 
          isActive={myLevel !== 4 ? false : true} 
          level={level} 
          isVisible={currentStoreLevel >= 4 ? true : false}
        />
    </>
  )
}