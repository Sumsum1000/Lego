//import React, {Suspense, useState, useMemo} from 'react'
import { Position, Rotation, Scale, MaterialType } from '@/app/utils/Types';
import { MeshStandardMaterial } from 'three';
import { TextureLoader } from 'three';
import { LevelProps } from '@/app/utils/Types';
import { LevelBlock } from '../../level/LevelBlock';
import { level1 } from '../../levelsData/Level1';
import { level2 } from '../../levelsData/level2';
import { level3 } from '../../levelsData/level3';
import { level4 } from '../../levelsData/level4';



const degreesToRadians = (degrees: number) => degrees * (Math.PI / 180);


export const Level4 = ({isLeftArrowClicked,level, isActive}: LevelProps) => {

  const numOfElements = level4.length;

  return (
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
          isActive={isActive} 
          level={level} 
        />
    </>
  );
}