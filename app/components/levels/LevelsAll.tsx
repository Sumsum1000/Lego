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
import { level16 } from '../levelsData/level16';



export const LevelAll = () => {
  
  const levelStore = useLevelStore();
  const {level, setCurrentLevel, setNextLevel, setAnimationStatus} = levelStore;
  const { currentLevel, tempLevel, isEndAnimation } = level;
  const [myLevel, setMuyLevel] = useState(1)
  const [myVisible, setMyVisible] = useState(false)

  const clickStore = useClickStore();
  const {isLeftButton} = clickStore;
  

  useEffect(() => {
    const timeout = setTimeout(() => {
        setMuyLevel(currentLevel)
    },1500)

    return(() => {
      clearTimeout(timeout);  
    })
  }, [currentLevel])


  // const test = (currentLevel: number, componentLevel: number) => {
  //   if(!isLeftButton){
  //     setTimeout(() => {
  //       setMyVisible(true)
  //       return true
  //     }, 200)
  //   }
  //   if(isLeftButton && currentLevel <= componentLevel){

  //       setMyVisible(true)
  //       return true
  //   }
  // }


  return(
    <>
        <LevelBlock
          levelData={level1}
          isForwardAnim={isLeftButton} 
          isActive={(currentLevel === 1) ? true : false} 
          level_={1} 
          isVisible={currentLevel >= 1 ? true : false}
          //isVisible={true}
        />
        <LevelBlock
          levelData={level2}
          isForwardAnim={isLeftButton}
          isActive={currentLevel === 2 ? true : false} 
          level_={2} 
          isVisible={(currentLevel >= 2) ? true : false}
          //isVisible={true}
        />
        <LevelBlock
          levelData={level3}
          isForwardAnim={isLeftButton} 
          isActive={currentLevel === 3 ? true : false} 
          level_={3} 
          isVisible={(currentLevel >= 3) ? true : false}
          //isVisible={true}
        />


        
        <LevelBlock
          levelData={level4}
          isForwardAnim={isLeftButton} 
          isActive={currentLevel === 4 ? true : false} 
          level_={4} 
          isVisible={(currentLevel >= 4) ? true : false}
          //isVisible={true}
        />
        <LevelBlock
          levelData={level5}
          isForwardAnim={isLeftButton} 
          isActive={currentLevel === 5 ? true : false} 
          level_={5} 
          isVisible={(currentLevel >= 5) ? true : false}
          //isVisible={true}
        />
        {/* <LevelBlock
          levelData={level16} 
          isForwardAnim={isLeftButton} 
          isActive={myLevel !== 6 ? false : true} 
          level_={6} 
          isVisible={currentLevel >= 6 ? true : false}
        /> */}
        {/* <LevelBlock
          levelData={level7} 
          isForwardAnim={isLeftButton} 
          isActive={myLevel !== 7 ? false : true} 
          level_={7} 
          isVisible={currentLevel >= 7 ? true : false}
        /> */}
    </>
  )
}