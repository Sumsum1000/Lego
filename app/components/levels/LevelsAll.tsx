import React, {Suspense, useEffect, useState} from 'react'
import { Position, Rotation, Scale, MaterialType } from '@/app/utils/Types';
import { LevelProps } from '@/app/utils/Types';
import {useLevelStore} from '../store/Store';
import { useClickStore } from '../store/Store';
import { LevelBlock } from '../level/LevelBlock';
import { level1 } from '../levelsData/level1';
import { level2 } from '../levelsData/level2';
import { level3 } from '../levelsData/level3';
import { level4 } from '../levelsData/level4';
import { level5 } from '../levelsData/level5';
import { level6 } from '../levelsData/level6';
import { level7 } from '../levelsData/level7';



export const LevelAll = ({level}: LevelProps) => {
  
  const levelStore = useLevelStore();
  const currentStoreLevel = levelStore.currentLevel;
  const [myLevel, setMuyLevel] = useState(1)
  const [myVisible, setMyVisible] = useState(false)

  const clickStore = useClickStore();
  const {isLeftButton} = clickStore;

  useEffect(() => {
    const timeout = setTimeout(() => {
        setMuyLevel(currentStoreLevel)
    },1500)

    return(() => {
      clearTimeout(timeout);  
    })
  }, [currentStoreLevel])


  const test = (currentLevel: number, componentLevel: number) => {
    if(!isLeftButton){
      setTimeout(() => {
        setMyVisible(true)
        return true
      }, 200)
    }
    if(isLeftButton && currentLevel <= componentLevel){

        setMyVisible(true)
        return true
    }
  }


  return(
    <>
        <LevelBlock
          levelData={level1}
          isForwardAnim={isLeftButton} 
          isActive={myLevel === 1 ? true : false} 
          level={level} 
          isVisible={currentStoreLevel >= 1 ? true : false}
          //isVisible={true}
        />
        <LevelBlock
          levelData={level2}
          isForwardAnim={isLeftButton}
          isActive={myLevel === 2 ? true : false} 
          level={level} 
          isVisible={currentStoreLevel >= 2 ? true : false}
          //isVisible={true}
        />
        <LevelBlock
          levelData={level3}
          isForwardAnim={isLeftButton} 
          isActive={myLevel === 3 ? true : false} 
          level={level} 
          isVisible={currentStoreLevel >= 3 ? true : false}
          //isVisible={true}
        />
        {/* <LevelBlock
          levelData={level4} 
          isLeftArrowClicked={isLeftArrowClicked} 
          isActive={myLevel !== 4 ? false : true} 
          level={level} 
          isVisible={currentStoreLevel >= 4 ? true : false}
        />
        <LevelBlock
          levelData={level5} 
          isLeftArrowClicked={isLeftArrowClicked} 
          isActive={myLevel !== 5 ? false : true} 
          level={level} 
          isVisible={currentStoreLevel >= 5 ? true : false}
        />
        <LevelBlock
          levelData={level6} 
          isLeftArrowClicked={isLeftArrowClicked} 
          isActive={myLevel !== 6 ? false : true} 
          level={level} 
          isVisible={currentStoreLevel >= 6 ? true : false}
        />
        <LevelBlock
          levelData={level7} 
          isLeftArrowClicked={isLeftArrowClicked} 
          isActive={myLevel !== 7 ? false : true} 
          level={level} 
          isVisible={currentStoreLevel >= 7 ? true : false}
        /> */}
    </>
  )
}