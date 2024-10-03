import { Model } from '../../models3D/Models3D';
import { level1 } from '../../levelsData/Level1';
import { MeshPhysicalMaterial, Color } from 'three';
import {modelsData} from '@/app/components/models3D/ModelsData'
import { Canvas } from '@react-three/fiber';
import { Box, Environment, Html, OrbitControls, PerspectiveCamera, useGLTF, SoftShadows } from "@react-three/drei";
import Lights from '../../lights';
import { Level1 } from '../level1/page';
import { useEffect, useState } from 'react';
 

const degreesToRadians = (degrees: number) => degrees * (Math.PI / 180);

type List = [];



type Level1Props = {
  isLeftArrowClicked: boolean;
  level: string;
  isActive: boolean;
  array: [];
};

export const LevelTest = ({ isLeftArrowClicked, level, isActive, }: Level1Props) => {
  const numOfElements = level1.length;
  const [newArr, setNewArr] = useState<typeof modelsData>(modelsData)

  useEffect(() => {
      const temp = modelsData.slice(1, 2)
      //setNewArr(temp);
  }, [newArr])
  

  return (
    <>
      {newArr.map((model, i) => {


        return (       
                  <group key={i}>
                    {/* <Model
                      url={model.url}
                      name={model.name}
                      color={model.color}
                      level={level}
                      isActive={isActive}
                      transitionScale={{ duration: 0.4, delay: 0.15 * i, type: 'spring', stiffness: 80 }}
                      startPosition={[model.startPosition[0], model.startPosition[1], model.startPosition[2]]}
                      targetPosition={[model.targetPosition[0], model.targetPosition[1], model.targetPosition[2]]}
                      rotation={[model.rotation[0], degreesToRadians(model.rotation[1]), model.rotation[2]]}
                      scale={[model.scale[0], model.scale[1], model.scale[2]]}
                      castShadow={model.castShadow}
                      receiveShadow={model.recieveShadow}
                      isLeftArrowClicked={isLeftArrowClicked}
                      delayOut={!isActive ? i * 0.2 : i * 1}
                      delayIn={(numOfElements - 1 - i) * 1}
                    /> */}
                  </group>

        );
      })}
    </>
  );
};