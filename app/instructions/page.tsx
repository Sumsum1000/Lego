'use client'
import { FaChevronLeft } from "react-icons/fa";
import { FaChevronRight } from "react-icons/fa";
import { Box, Environment, Html, OrbitControls, PerspectiveCamera, useGLTF, SoftShadows } from "@react-three/drei";
import { Canvas, useLoader, useThree,  } from "@react-three/fiber";
import { Suspense, useMemo, forwardRef, useState, useEffect } from 'react'
import { level1 } from "../components/levelsData/level1";
import { level2 } from "../components/levelsData/level2";
import { level3 } from "../components/levelsData/level3";
import { level4 } from "../components/levelsData/level4";
import { level5 } from "../components/levelsData/level5";
import { level6 } from "../components/levelsData/level6";
import { level7 } from "../components/levelsData/level7";
import { level8 } from "../components/levelsData/level8";
import { level9 } from "../components/levelsData/level9";
import { level10 } from "../components/levelsData/level10";
import { level11 } from "../components/levelsData/level11";
import { level12 } from "../components/levelsData/level12";
import { level13 } from "../components/levelsData/level13";
import { level14 } from "../components/levelsData/level14";
import { level15 } from "../components/levelsData/level15";
import { level16 } from "../components/levelsData/level16";
import * as THREE from 'three';
import { Perf } from "r3f-perf";
import { useControls } from "leva";
import { Euler } from "three";
import { ModelGltf } from "../components/models3D/ModelGltf";
import Pagination from "../components/pagination/Pagination";
import { PaginagionType } from "../utils/Types";
import { LevelAll } from "../components/levels/LevelsAll";
import {useLevelStore} from "../components/store/Store";
import { useClickStore } from "../components/store/Store";
import { useDirectionFlowStore } from "../components/store/Store";
import { Bloom, DepthOfField, EffectComposer, Noise, Vignette, ToneMapping } from '@react-three/postprocessing'
import { BlendFunction } from "postprocessing";
import Bullet from "../components/bullet/Bullet";
import { MathUtils } from 'three'; 
import { p } from "framer-motion/m";
import { BulletType } from "../utils/Types";
import EngineFire from "../components/engineFire/EngineFire";

//--------------------------------------------------------

type ModelType = {
  model: string
}

const TestElement = ({model}: ModelType) => {
  const { position, rotation, scale } = useControls({
    position: { 
      value: {x: 0, y: 0, z: 0}
    },
    rotation: {
      value: {x: 0, y: 0, z: 0}
    },
    scale: {
      value: {x:1, y: 1, z: 1}
    }
  })

  const gltf = useGLTF(model)

  return (
    <group 
        position-x={position.x} 
        position-y={position.y} 
        position-z={position.z}
        rotation={new Euler(
          MathUtils.degToRad(rotation.x),
          MathUtils.degToRad(rotation.y),
          MathUtils.degToRad(rotation.z)
        )}
        scale-x={scale.x}
        scale-y={scale.y}
        scale-z={scale.z}
    >
    <primitive object={gltf.scene} 
     />
    </group>
  )
}


//const degreesToRadians = (degrees: number) => degrees * (Math.PI / 180);

type BtnType = {
  onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  value: boolean
};




const Instructions = () => {

  
  //const [currentPage, setCurrentPage] = useState(1);

  const totalPages = 17;
  const [shouldAnimate, setShouldAnimate] = useState(false);
  const [isLeftArrowClicked_, setIsLeftArrowClicked_] = useState(true);
  const [bullets, setBullets] = useState<string[]>([]);
  const [engine, setEngine] = useState(false);

  const levelData ={
    level1, level2, level3, level4, level5, level6,
    level7, level8, level9, level10, level11, level12,
    level13, level14, level15, level16
  }

  const bulletsPosition: BulletType[] = [
    { position: [1.2, 0.2, -14] },
    { position: [-1.2, 0.2, -14] }
  ];

  const levelStore = useLevelStore();
  const {level, setCurrentLevel, setNextLevel, setAnimationStatus} = levelStore;
  const { currentLevel, tempLevel, isEndAnimation, } = level;


  const clickStore = useClickStore();
  const {isLeftButton, canClick ,setLeftClick, setRightClick, setCanClick} = clickStore

  const handlePageChange: PaginagionType['onPageChange'] = (page) => {
    console.log("Changing to page:", page);
    setAnimationStatus(false);
    setCurrentLevel(page);
    
  };

  const startLegoHandler = () => {
    //setCurrentLevel((state) => 1);
    setNextLevel();
  }

  const testClick = () => {
    setCanClick(true)
  }

  const fireHandler= () => {
    console.log('Shoot')
    setBullets(prevBullets => [...prevBullets, '*'])
  }

  const engineHandler = () => {
    console.log('engine on')
    setEngine(prev => !prev)
  }


  return (
        <div className="h-screen  bg-gray-800">
        <div className="z-10 absolute right-0 flex flex-col space-y-2">
          <button 
            className="right-0 top-0 p-6 bg-yellow-500" 
            onClick={fireHandler}
          >Fire</button>
          <button 
            className="right-0 top-0 p-6 bg-yellow-500" 
            onClick={engineHandler}
          >Engine</button>
        </div>

          {currentLevel < 1 && <button 
              className={ "absolute left-1/2 -translate-x-1/2 top-1/3 text-6xl z-10" }
              onClick={startLegoHandler}
          >Tap to start Lego</button>}
          {/* <h1 className="absolute text-6xl">{currentLevel}</h1> */}
          <div className="w-48  h-48 absolute right-1/3 top-12 z-10">
        <Pagination 
            currentPage={currentLevel}
            totalPages={totalPages}
            onPageChange={handlePageChange}
        />

          </div>
        <Canvas className="h-screen relative" shadows >
            
            
            <Perf className='top-left'/>
            <Suspense fallback={null}>
              
                {/* <LevelAll isLeftArrowClicked={isLeftArrowClicked_} shouldAnimate={true}/> */}
                <LevelAll />
               {engine && <EngineFire ringsPosition={[6.35, 2.05, -3.5]} conePosition={[6.35, 2.05, -0.7]}/>}
               {engine && <EngineFire ringsPosition={[-6.35, 2.05, -3.5]} conePosition={[-6.35, 2.05, -0.7]}/>}
                {bullets.map(bullet => (
                  <>
                      <Bullet position={bulletsPosition[0].position}/>
                      <Bullet position={bulletsPosition[1].position}/>
                  </>
                ))}
              {/* <TestElement model="/3dModels/Level16/Cpockpit.glb"/> */}
            </Suspense>
            {/* <OrbitControls maxDistance={30} minDistance={12} enablePan={false} target={[0, 0, 0]}/> */}
            <OrbitControls />
            <PerspectiveCamera makeDefault position={[0.5, 5, -31]} />
             <Environment files={'poly_haven_studio_1k.hdr'} background={false} />

        </Canvas>
        </div>
  )
}

export default Instructions;


             {/* <pointLight position={[0, 8.5, 4]} intensity={40}/>
             <pointLight position={[0, 7, -1]} intensity={50}/> */}
             {/* <pointLight position={[1, 3, -12]} intensity={90}/>
             <pointLight position={[11, 1, -3]} intensity={90}/>
             <pointLight position={[-11, 1, -3]} intensity={90}/>
             <pointLight position={[0, -5, 0]} intensity={90}/> */}