import React from 'react';
import { Model } from '../../models3D/Models3D';
import { level1 } from '../../levelsData/Level1';
import { Position, Rotation, Scale } from '@/app/utils/Types';
import { LevelBlock } from '../../level/LevelBlock';
import { LevelProps } from '@/app/utils/Types';

const degreesToRadians = (degrees: number) => degrees * (Math.PI / 180);


export const Level1 = ({isLeftArrowClicked, isActive, level}: LevelProps) => {
  const numOfElements = level1.length;

  return (
    <>
        <LevelBlock 
             levelData={level1}
             isLeftArrowClicked={isLeftArrowClicked} 
             isActive={isActive} 
             level="1" 
        /> 
    </>
  );
};
