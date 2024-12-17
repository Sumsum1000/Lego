import React, {Suspense, useEffect, useState, useMemo} from 'react'
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
import { level8 } from '../levelsData/level8';
import { level9 } from '../levelsData/level9';
import { level10 } from '../levelsData/level10';
import { level11 } from '../levelsData/level11';
import { level12 } from '../levelsData/level12';
import { level13 } from '../levelsData/level13';
import { level14 } from '../levelsData/level14';
import { level15 } from '../levelsData/level15';
import { level16 } from '../levelsData/level16';
import { useTexture, useGLTF, Box } from '@react-three/drei';
import { clone } from 'three/examples/jsm/utils/SkeletonUtils.js';



const levels = [
  level1, level2, level3, level4, level5, level6,
  level7, level8, level9, level10, level11, level12,
  level13, level14, level15, level16,
];

export const LevelAll = () => {
  const levelStore = useLevelStore();
  const { level } = levelStore;
  const { currentLevel } = level;

  const clickStore = useClickStore();
  const { isLeftButton } = clickStore;

  // Array of visibility states for each level block
  const [visibleLevels, setVisibleLevels] = useState<boolean[]>(Array(levels.length).fill(true));

 

  return (
    <>
      {/* <Base /> */}
      {levels.map((level, i) => (
        <LevelBlock
          key={i} 
          levelData={level}
          isForwardAnim={isLeftButton} 
          isActive={currentLevel === i + 1} 
          level_={i + 1} 
          isVisible={visibleLevels[i]} // Use visibility state from array
        />
      ))}
    </>
  );
};

const Base = () => {
  const diffuseMap = useTexture('/Base.jpg');
  const { scene } = useGLTF('/Base.glb');
  

  return (
    <group scale={2.55} position={[0, 0, 0]}>
      <primitive object={scene} />
    </group>
  );
};








// const levels = [
//   level1, level2, level3, 
// ];

// const levels = [
//   level1, level2, level3, level4, level5, level6,
//   level7, level8, level9, level10, level11, level12,
//   level13, level14, level15, level16
// ];

// export const LevelAll = () => {
  
//   const levelStore = useLevelStore();
//   const {level, setCurrentLevel, setNextLevel, setAnimationStatus} = levelStore;
//   const { currentLevel, tempLevel, isEndAnimation } = level;
//   const [myLevel, setMuyLevel] = useState(1)
//   const [myVisible, setMyVisible] = useState(false)

//   const clickStore = useClickStore();
//   const {isLeftButton} = clickStore;
  




//   // const test = (currentLevel: number, componentLevel: number) => {
//   //   if(!isLeftButton){
//   //     setTimeout(() => {
//   //       setMyVisible(true)
//   //       return true
//   //     }, 200)
//   //   }
//   //   if(isLeftButton && currentLevel <= componentLevel){

//   //       setMyVisible(true)
//   //       return true
//   //   }
//   // }


//   return(
//     <>
//         {
//           levels.map((level, i) => (
//             <LevelBlock
//               key={i} // Add a unique key when using map
//               levelData={level}
//               isForwardAnim={isLeftButton} 
//               isActive={(currentLevel === i+1) ? true : false} 
//               level_={i+1} 
//               isVisible={currentLevel >= i+1 ? true : false}
//               //isVisible={true}
//             />
//           ))
//         }


//     </>
//   )
// }


