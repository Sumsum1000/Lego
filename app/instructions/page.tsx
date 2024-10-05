'use client'
import { FaChevronLeft } from "react-icons/fa";
import { FaChevronRight } from "react-icons/fa";
import { Box, Environment, Html, OrbitControls, PerspectiveCamera, useGLTF, SoftShadows } from "@react-three/drei";
import { Canvas, useLoader, useThree,  } from "@react-three/fiber";
import { Suspense, useMemo, forwardRef, useState, useEffect } from 'react'
import { Level1 } from "../components/levels/level1/page";
import { Level2 } from "../components/levels/level2/page";
import { Level3 } from "../components/levels/level3/page";
import { Level4 } from "../components/levels/level4/page";
import { Level5 } from "../components/levels/level5/page";
import { Level6 } from "../components/levels/level6/page";
import { Level7 } from "../components/levels/level7/page";
import { Level8 } from "../components/levels/level8/page";
import { Level9 } from "../components/levels/level9/page";
import { Level10 } from "../components/levels/level10/page";
import { Level11 } from "../components/levels/level11/page";
import { Level12 } from "../components/levels/level12/page";
import { Level13 } from "../components/levels/level13/page";
import { Level14 } from "../components/levels/level14/page";
import { Level15 } from "../components/levels/level15/page";
import { Level16 } from "../components/levels/level16/page";
import { level1 } from "../components/levelsData/Level1";
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
import { useStore } from "zustand";
import {useLevelStore} from "../components/store/Store";


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
  const [currentLevel, setCurrentLevel] = useState(0);

  const levels = [
      Level1,  Level2, Level3, Level4, Level5, Level6, 
      Level7, Level8, Level8, Level10, Level11, Level12, 
      Level13, Level14, Level15, Level16, 
  ]
  const levelData ={
    level1, level2, level3, level4, level5, level6,
    level7, level8, level9, level10, level11, level12,
    level13, level14, level15, level16
  }

  const levelStore = useLevelStore();
  const currentStoreLevel = levelStore.currentLevel;
  

  // useEffect(() => {
  //   console.log('State updated - isLeftArrowClicked_:', isLeftArrowClicked_);
  // }, [isLeftArrowClicked_]);

  const handlePageChange: PaginagionType['onPageChange'] = (page) => {
    console.log("Changing to page:", page);
    setCurrentLevel(page);
    setIsLeftArrowClicked_(true);
  };

  const rightClickHandler = () => {
    setIsLeftArrowClicked_(prevState => false);
} 

  const leftClickHandler = () => {
      setIsLeftArrowClicked_(prevState => true);
  }

  const startLegoHandler = () => {
    setCurrentLevel((prevLevel) => 1);
  }




useEffect(() => {
  // Set shouldAnimate to true after the initial mount
  setShouldAnimate(true);
}, []);

  return (
        // <h1>Instrucions</h1>
        <div className="h-screen bg-gray-900">
          <h1 className="mt-28">{currentStoreLevel}</h1>
          {currentLevel < 1 && <button 
              className={ "absolute left-1/2 -translate-x-1/2 top-1/3 text-6xl z-10" }
              onClick={startLegoHandler}
          >Tap to start Lego</button>}
          <h1 className="absolute text-6xl">{currentLevel}</h1>
          <div className="w-48  h-48 absolute right-1/3 top-12 z-10">
              <button 
                  className={isLeftArrowClicked_ ? "text-gray-500 text-7xl" : "text-black text-7xl"}
                  onClick={leftClickHandler}
              >{'<'}</button>
              <button 
                 className={!isLeftArrowClicked_  ? "text-gray-500 text-7xl" : "text-black text-7xl"}
                  onClick={rightClickHandler}
              >{'>'}</button>


        <Pagination 
            currentPage={currentLevel}
            totalPages={totalPages}
            onPageChange={handlePageChange}
        />

          </div>
        <Canvas className="relative" shadows >
            
            <Perf className='top-left'/>
            <Suspense fallback={null}>

              {/* {
                levels.map((_, i) => {
                  const levelKey = `level${i + 1}` as keyof typeof levelData; 

                  return (
                    currentLevel > i && (
                      <LevelBlock
                        key={i}
                        levelData={levelData[levelKey]} 
                        isLeftArrowClicked={isLeftArrowClicked_}
                        isActive={currentLevel === (i + 1)}
                        level={(i + 1).toString()}
                      />
                    )
                  );
                })
              } */}
              
                <LevelAll isLeftArrowClicked={isLeftArrowClicked_} shouldAnimate={true}/>


              {/* {currentLevel === 1 && 
                <Level1
                  isLeftArrowClicked={isLeftArrowClicked_} 
                  isActive={currentLevel !== 1 ? false : true} 
                  level={'1'} 
                  shouldAnimate={shouldAnimate}
                />
              } 
              {currentLevel === 2 && 
                <Level2
                  isLeftArrowClicked={isLeftArrowClicked_} 
                  isActive={currentLevel !== 2 ? false : true} 
                  level={'2'} 
                  shouldAnimate={shouldAnimate}
                />
              } 
                    {currentLevel === 3 && 
                <Level3
                  isLeftArrowClicked={isLeftArrowClicked_} 
                  isActive={currentLevel !== 3 ? false : true} 
                  level={'3'} 
                  shouldAnimate={shouldAnimate}
                />
              } 
                    {currentLevel === 4 && 
                <Level4
                  isLeftArrowClicked={isLeftArrowClicked_} 
                  isActive={currentLevel !== 4 ? false : true} 
                  level={'4'} 
                  shouldAnimate={shouldAnimate}
                />
              } 
                    {currentLevel === 5 && 
                <Level5
                  isLeftArrowClicked={isLeftArrowClicked_} 
                  isActive={currentLevel !== 5 ? false : true} 
                  level={'5'} 
                  shouldAnimate={shouldAnimate}
                />
              } 
              {currentLevel === 6 && 
                <Level6
                  isLeftArrowClicked={isLeftArrowClicked_} 
                  isActive={currentLevel !== 6 ? false : true} 
                  level={'6'} 
                  shouldAnimate={shouldAnimate}
                />
              } 
              {currentLevel === 7 && 
                <Level7
                  isLeftArrowClicked={isLeftArrowClicked_} 
                  isActive={currentLevel !== 7 ? false : true} 
                  level={'7'} 
                  shouldAnimate={shouldAnimate}
                />
              } 
              {currentLevel === 8 && 
                <Level8
                  isLeftArrowClicked={isLeftArrowClicked_} 
                  isActive={currentLevel !== 8 ? false : true} 
                  level={'8'} 
                  shouldAnimate={shouldAnimate}
                />
              } 
              {currentLevel === 9 && 
                <Level9
                  isLeftArrowClicked={isLeftArrowClicked_} 
                  isActive={currentLevel !== 9 ? false : true} 
                  level={'9'} 
                  shouldAnimate={shouldAnimate}
                />
              } 
              {currentLevel === 10 && 
                <Level10
                  isLeftArrowClicked={isLeftArrowClicked_} 
                  isActive={currentLevel !== 10 ? false : true} 
                  level={'10'} 
                  shouldAnimate={shouldAnimate}
                />
              } 
              {currentLevel === 11 && 
                <Level11
                  isLeftArrowClicked={isLeftArrowClicked_} 
                  isActive={currentLevel !== 11 ? false : true} 
                  level={'11'} 
                  shouldAnimate={shouldAnimate}
                />
              } 
              {currentLevel === 12 && 
                <Level12
                  isLeftArrowClicked={isLeftArrowClicked_} 
                  isActive={currentLevel !== 12 ? false : true} 
                  level={'12'} 
                  shouldAnimate={shouldAnimate}
                />
              } 
              {currentLevel === 13 && 
                <Level13
                  isLeftArrowClicked={isLeftArrowClicked_} 
                  isActive={currentLevel !== 13 ? false : true} 
                  level={'13'} 
                  shouldAnimate={shouldAnimate}
                />
              } 
              {currentLevel === 14 && 
                <Level14
                  isLeftArrowClicked={isLeftArrowClicked_} 
                  isActive={currentLevel !== 14 ? false : true} 
                  level={'14'} 
                  shouldAnimate={shouldAnimate}
                />
              } 
              {currentLevel === 15 && 
                <Level15
                  isLeftArrowClicked={isLeftArrowClicked_} 
                  isActive={currentLevel !== 15 ? false : true} 
                  level={'15'} 
                  shouldAnimate={shouldAnimate}
                />
              } 
              {currentLevel === 16 && 
                <Level16
                  isLeftArrowClicked={isLeftArrowClicked_} 
                  isActive={currentLevel !== 16 ? false : true} 
                  level={'16'} 
                  shouldAnimate={shouldAnimate}
                />
              }  */}



              {/* <TestElement model="/3dModels/Level16/Cpockpit.glb"/> */}
            </Suspense>

            <OrbitControls />
            <PerspectiveCamera makeDefault position={[0.5, 28, -31]}/>
             {/* <Environment files={'brown_photostudio_02_1k-1.hdr'} background={false} /> */}
        </Canvas>
        </div>
  )
}

export default Instructions;






{/* <ul className="flex gap-8 text-3xl right-9">
<li className={currentLevel == 1 ? "text-black" : "text-white"} onClick={() => updateCurrentLevel(1)}>1</li>
<li className={currentLevel == 2 ? "text-black" : "text-white"} onClick={() => updateCurrentLevel(2)}>2</li>
<li className={currentLevel == 3 ? "text-black" : "text-white"} onClick={() => updateCurrentLevel(3)}>3</li>
<li className={currentLevel == 4 ? "text-black" : "text-white"} onClick={() => updateCurrentLevel(4)}>4</li>
<li className={currentLevel == 5 ? "text-black" : "text-white"} onClick={() => updateCurrentLevel(5)}>5</li>
<li className={currentLevel == 6 ? "text-black" : "text-white"} onClick={() => updateCurrentLevel(6)}>6</li>
<li className={currentLevel == 7 ? "text-black" : "text-white"} onClick={() => updateCurrentLevel(7)}>7</li>
<li className={currentLevel == 8 ? "text-black" : "text-white"} onClick={() => updateCurrentLevel(8)}>8</li>
<li className={currentLevel == 9 ? "text-black" : "text-white"} onClick={() => updateCurrentLevel(9)}>9</li>
<li className={currentLevel == 10 ? "text-black" : "text-white"} onClick={() => updateCurrentLevel(10)}>10</li>
<li className={currentLevel == 11 ? "text-black" : "text-white"} onClick={() => updateCurrentLevel(11)}>11</li>
<li className={currentLevel == 12 ? "text-black" : "text-white"} onClick={() => updateCurrentLevel(12)}>12</li>
<li className={currentLevel == 13 ? "text-black" : "text-white"} onClick={() => updateCurrentLevel(13)}>13</li>
<li className={currentLevel == 14 ? "text-black" : "text-white"} onClick={() => updateCurrentLevel(14)}>14</li>
<li className={currentLevel == 15 ? "text-black" : "text-white"} onClick={() => updateCurrentLevel(15)}>15</li>
<li className={currentLevel == 16 ? "text-black" : "text-white"} onClick={() => updateCurrentLevel(16)}>16</li>
</ul> */}




            {/* <EffectComposer>
                <ToneMapping
                    blendFunction={BlendFunction.ADD} // blend mode
                    adaptive={true} // toggle adaptive luminance map usage
                    resolution={256} // texture resolution of the luminance map
                    middleGrey={0.6} // middle grey factor
                    maxLuminance={16.0} // maximum luminance
                    averageLuminance={1.0} // average luminance
                    adaptationRate={1.0} // luminance adaptation rate
                />

            </EffectComposer>     */}


// {currentLevel > 4 && 
//   <Level5
//     isLeftArrowClicked={isLeftArrowClicked_} 
//     isActive={currentLevel !== 5 ? false : true} 
//     level={'5'} 
//     shouldAnimate={shouldAnimate}
//   />
// } 






{/* <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
<div>
  <nav aria-label="Pagination" className="isolate inline-flex -space-x-px rounded-md shadow-sm">
    <a
      href="#"
      className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
    >
      <span className="sr-only">Previous</span>
      <FaChevronLeft aria-hidden="true" className="h-5 w-5" />
    </a>
      <a
      href="#"
      aria-current="page"
      className="relative z-10 inline-flex items-center bg-indigo-600 px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
    >
      1
    </a>
    <a
      href="#"
      className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-200 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
    >
      2
    </a>
    <a
      href="#"
      className="relative hidden items-center px-4 py-2 text-sm font-semibold text-gray-200 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 md:inline-flex"
    >
      3
    </a>
    <span className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-200 ring-1 ring-inset ring-gray-300 focus:outline-offset-0">
      ...
    </span>
    <a
      href="#"
      className="relative hidden items-center px-4 py-2 text-sm font-semibold text-gray-200 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 md:inline-flex"
    >
      8
    </a>
    <a
      href="#"
      className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-200 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
    >
      9
    </a>
    <a
      href="#"
      className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-200 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
    >
      10
    </a>
    <a
      href="#"
      className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
    >
      <span className="sr-only">Next</span>
      <FaChevronRight aria-hidden="true" className="h-5 w-5" />
    </a>
  </nav>
</div>
</div> */}