import React, {Suspense, useState} from 'react'
import { Model } from '../../models3D/Models3D'
import { Position, Rotation, Scale } from '@/app/utils/Types';
import { LevelBlock } from '../../level/LevelBlock';
import { level1 } from '../../levelsData/Level1';
import { level2 } from '../../levelsData/level2';
import { level3 } from '../../levelsData/level3';
import { level4 } from '../../levelsData/level4';
import { LevelProps } from '@/app/utils/Types';
import { ModelGltf } from '../../models3D/ModelGltf';

const degreesToRadians = (degrees: number) => degrees * (Math.PI / 180);


export const Level2 = ({ isLeftArrowClicked, isActive, level, startPosition }: LevelProps) => {

  const numOfElements = level2.length;

  return (
    <>
    {/* <LevelBlock
      levelData={level1}
      isLeftArrowClicked={false}
      isActive={false}
      level={'1'}
    /> */}

              {/* <ModelGltf 
                  model={{
                    url: '/3dModels/Level1/Lego_1_6469300.glb',
                    name: '#Test',
                    isActive: true,
                    startPosition: [0, 2, 0],
                    targetPosition: [0, 0, 0],
                    rotation: [0, 0, 0],
                    scale: [1, 1, 1],
                    transitionScale: {duration: 0.5, delay: 0.5},
                    isLeftArrowClicked: false,
                    delayIn: 0.5,
                    delayOut: 0.5,
                    color: 'white',
                    map: 'Part_1_VRayCompleteMap.jpg',
                  }}
              /> */}

              {/* <ModelGltf 
                  model={{
                    url: '/3dModels/Level1/Lego_2_6265731.glb',
                    name: '#Test',
                    isActive: true,
                    startPosition: [0, 2, 0],
                    targetPosition: [0.8, 0.8, 2.4],
                    rotation: [0, 0, 0],
                    scale: [1, 1, 1],
                    transitionScale: {duration: 0.5, delay: 0.5},
                    isLeftArrowClicked: false,
                    delayIn: 0.5,
                    delayOut: 0.5,
                    map: '/Group_1.jpg',
                    color: 'white'
                  }}
              />

              <ModelGltf 
                  model={{
                    url: '/3dModels/Level1/Lego_2_6265731.glb',
                    name: '#Test',
                    isActive: true,
                    startPosition: [0, 2, 0],
                    targetPosition: [-0.8, 0.8, 2.4],
                    rotation: [0, 0, 0],
                    scale: [1, 1, 1],
                    transitionScale: {duration: 0.5, delay: 0.5},
                    isLeftArrowClicked: false,
                    delayIn: 0.5,
                    delayOut: 0.5,
                    map: '/Group_1.jpg',
                    color: 'white'
                  }}
              /> */}

    {/* {
        level2.map(element => {
          console.log(level2)
          return(
              <ModelGltf 
                key={element.id} // Ensure you use a unique key
                //isLeftArrowClicked={true} 
                //isActive={isActive} 
                model={{
                    url: element.url,
                    name: element.name,
                    isActive: isActive, // or use `isActive`
                    startPosition: element.startPosition,
                    targetPosition: element.targetPosition,
                    rotation: element.rotation,
                    scale: element.scale,
                    transitionScale: { duration: 1, delay: 0.3 }, // Adjust based on your `Transition` type
                    isLeftArrowClicked: false, // or use the actual state
                    delayIn: 0, // Provide actual delay values if necessary
                    delayOut: 0, // Provide actual delay values if necessary
                    color: 'white',
                    map: element.map,
                }}
              />
          )
        })
    } */}

      <LevelBlock
        levelData={level1} // Dynamic for Level 3
        isLeftArrowClicked={isLeftArrowClicked} // Dynamic prop
        isActive={false} // Dynamic prop
        level={level} // Ensure level is passed as a string
      />
      <LevelBlock
        levelData={level2} // Dynamic for Level 3
        isLeftArrowClicked={isLeftArrowClicked} // Dynamic prop
        isActive={isActive} // Dynamic prop
        level={level} // Ensure level is passed as a string
      />
  </>
  );
}