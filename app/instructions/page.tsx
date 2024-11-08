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
import { LevelBlock } from "../components/level/LevelBlock";
import { useRef } from "react";
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
 

//--------------------------------------------------------
//const degreesToRadians = (degrees: number) => degrees * (Math.PI / 180);

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
          degreesToRadians(rotation.x),
          degreesToRadians(rotation.y),
          degreesToRadians(rotation.z)
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


const degreesToRadians = (degrees: number) => degrees * (Math.PI / 180);

type BtnType = {
  onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  value: boolean
};




const Instructions = () => {

  
  //const [currentPage, setCurrentPage] = useState(1);

  const totalPages = 17;
  const [shouldAnimate, setShouldAnimate] = useState(false);
  const [isLeftArrowClicked_, setIsLeftArrowClicked_] = useState(true);

  // const levels = [
  //     Level1,  Level2, Level3, Level4, Level5, Level6, 
  //     Level7, Level8, Level8, Level10, Level11, Level12, 
  //     Level13, Level14, Level15, Level16, 
  // ]
  const levelData ={
    level1, level2, level3, level4, level5, level6,
    level7, level8, level9, level10, level11, level12,
    level13, level14, level15, level16
  }

  const levelStore = useLevelStore();
  const {level, setCurrentLevel, setNextLevel, setAnimationStatus} = levelStore;
  const { currentLevel, tempLevel, isEndAnimation, } = level;


const clickStore = useClickStore();
const {isLeftButton, canClick ,setLeftClick, setRightClick, setCanClick} = clickStore
  

  const handlePageChange: PaginagionType['onPageChange'] = (page) => {
    console.log("Changing to page:", page);
    setAnimationStatus(false);
    setCurrentLevel(page);
    
    // setCanClick(false)
    // setTimeout(() => {
    //   setCanClick(true)
    // }, 100)
    //setIsLeftArrowClicked_(true);
  };

  const rightClickHandler = () => {
    //setLeftClick()
    //setDirectionFlow('forward');
    //setIsLeftArrowClicked_(prevState => false);
} 

  const leftClickHandler = () => {
    //setRightClick()
    //setDirectionFlow('backward')
      //setIsLeftArrowClicked_(prevState => true);
  }

  const startLegoHandler = () => {
    //setCurrentLevel((state) => 1);
    setNextLevel();
  }

  const testClick = () => {
    setCanClick(true)
  }



  return (
        // <h1>Instrucions</h1>
        <div className="h-screen bg-slate-500">
          {/* <h1 className="mt-28">{isLeftButton.toString()}</h1> */}
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
            
            /
            <Perf className='top-left'/>
            <Suspense fallback={null}>
              
                {/* <LevelAll isLeftArrowClicked={isLeftArrowClicked_} shouldAnimate={true}/> */}
                <LevelAll />

              {/* <TestElement model="/3dModels/Level16/Cpockpit.glb"/> */}
            </Suspense>

            <OrbitControls />
            <PerspectiveCamera makeDefault position={[0.5, 28, -31]}/>
             <Environment files={'brown_photostudio_02_1k-1.hdr'} background={false} />
      {/* <EffectComposer >

        <ToneMapping 
           blendFunction={BlendFunction.COLOR_DODGE} // blend mode
           adaptive={true} // toggle adaptive luminance map usage
           resolution={256} // texture resolution of the luminance map
           middleGrey={0.6} // middle grey factor
           maxLuminance={16.0} // maximum luminance
           averageLuminance={1.0} // average luminance
           adaptationRate={1.0} // luminance adaptation rate
        />
      </EffectComposer> */}
        </Canvas>
        </div>
  )
}

export default Instructions;