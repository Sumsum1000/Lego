import React from 'react';
import { LevelBlock } from '../../level/LevelBlock';
import { level1 } from '../../levelsData/Level1';
import { level2 } from '../../levelsData/level2';
import { level3 } from '../../levelsData/level3';
import { LevelProps } from '@/app/utils/Types';


// Update the Level3 component with the correct props type
export const Level3 = ({ isLeftArrowClicked, isActive, level}: LevelProps) => {
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
        isActive={isActive} // Dynamic prop
        level={level} // Ensure level is passed as a string
      />
    </>

  );
};