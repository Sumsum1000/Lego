import React, { useMemo, useRef, useState, useEffect } from 'react';
import { clone } from 'three/examples/jsm/utils/SkeletonUtils.js';
import { useGLTF, Html, useTexture } from '@react-three/drei';
import { Object3D, Vector3, Euler, Mesh } from 'three';
import { motion, } from 'framer-motion-3d';
import { useAnimation } from 'framer-motion';
import { ThreeEvent } from '@react-three/fiber';
import {  ModelProps, } from '@/app/utils/Types';
import * as THREE from 'three';
import { useClickStore } from '../store/Store';
import { useLevelStore } from '../store/Store';
// test

  // Type guard to check if an object is a Mesh
  const isMesh = (obj: Object3D): obj is Mesh => {
    return (obj as Mesh).isMesh !== undefined;
  };



export const Model = ({ 
  model,onPointerOver, onPointerOut
}: ModelProps) => {
const { scene, nodes, materials } = useGLTF(model.url, true);
const clonedScene = useMemo(() => clone(scene), [scene]);
const [onAnim, setOnAnim] = useState(false)

const diffuseMap = useTexture(model.map || '/whiteMap.jpg');

const [isHover, setIsHover] = useState(false);
const [isClicked, setIsClicked] = useState(false);
const [gltfPosition, setGltfPosition] = useState();

const [animDirection, setAnimDirection] = useState<'forward' | 'backward'>('forward')
const clickStore = useClickStore();
const {isLeftButton, canClick, setRightClick, setLeftClick} = clickStore;

const levelStore = useLevelStore();
const {level} = levelStore;
const { currentLevel, tempLevel, isEndAnimation} = level;


const modelInitAnim = {
  x: model.startPosition[0], 
  y: model.startPosition[1],
  z: model.startPosition[2],
  opacity: 1,
  scale: 0, // Static scale
  transition: { duration: 1, delay: model.delayIn, times: [0, 0.5, 1] }
};

const modelTargetAnim = {
  x: model.targetPosition[0], 
  y: model.targetPosition[1],
  z: model.targetPosition[2],
  opacity: 1,
  scale: 1, // Static scale again
  transition: { duration: 1, delay: model.delayOut, times: [0, 1] }
};

const modelTestAnim = {
  x: model.startPosition[0], 
  y: model.startPosition[1], 
  z: model.startPosition[2], 
  opacity: 1,
  scale: 0,
  transition: {
    duration: 1.5, 
    delay: model.delayIn,
    //time: [0, 0.5, 1]
  }
}



const fadeOutAnim = {
  x: model.startPosition[0], 
  y: model.startPosition[1], 
  z: model.startPosition[2], 
  opacity: 1,
  scale: 0,
  transition: {
    duration: 1, 
    delay: model.delayIn,
    //time: [0, 0.5, 1]
  }
}



const [variantsAnim, setVariantsAnim] = useState({
  init: {
    ...modelInitAnim , 
    transition: {
      duration: 1, 
      delay: model.delayIn
    }
  },
  anim: {
    ...modelInitAnim , transition: {
      duration: 1, 
      delay: model.delayIn
    }
  },
});


const controls = useAnimation();

clonedScene.rotation.copy(new Euler(model.rotation[0], model.rotation[1], model.rotation[2]));
clonedScene.scale.copy(new Vector3(model.scale[0], model.scale[1], model.scale[2],));

 // Configure the texture and apply the material to the cloned scene
useEffect(() => {

       if (diffuseMap) {
        diffuseMap.flipY = false;
        diffuseMap.colorSpace = 'srgb'
        diffuseMap.needsUpdate = true;
       }     
}, [])

// const newMaterial = new THREE.MeshBasicMaterial({
//   toneMapped: false,
//   color: model.color || 'white',
//   map: diffuseMap,
//   //metalness: 0
// })

const newMaterial = new THREE.MeshPhysicalMaterial({
  //toneMapped: false,
  color: model.color || 'white',
  map: diffuseMap,
  //metalness: 0,
  roughness: 0.3,
  //emissiveMap: diffuseMap
})



// Enable shadows for all meshes in the scene
clonedScene.traverse((child) => {
  
  if (child instanceof Object3D && (child as any).isMesh) {
    child.castShadow = true;
    child.receiveShadow = true;
    const mesh = child as THREE.Mesh;
    mesh.material = newMaterial;
  }
});



const onClick = () => {
  console.log('Clicked2')
  setIsClicked(true);
  setIsHover(false);
}

const backToStartPos = () => {
  console.log('Clicked2')
  setIsClicked(false);
}

const handlePointerOver = (event: ThreeEvent<PointerEvent>) => {
  if (onPointerOver) onPointerOver(event);
  setIsHover(true);
};

const handlePointerOut = (event: ThreeEvent<PointerEvent>) => {
  if (onPointerOut) onPointerOut(event);
  setIsHover(false);
};

// for first level animation on start
useEffect(() => {
  setRightClick()
  const timeOut = setTimeout(() => {
    setLeftClick()
  }, 100)

  return(() => {
    clearTimeout(timeOut);
  })
}, [])



useEffect(() => {
  let timeoutDelay1: NodeJS.Timeout | undefined;

  // if (model.isActive && !isLeftButton) {
  //   // Set a delayed animation variant update
  //   timeoutDelay1 = setTimeout(() => {
  //     setVariantsAnim({
  //       init: modelInitAnim,
  //       anim: modelTargetAnim,
  //     });
  //   }, 2000);
  // } 

  // ---------------------------------------------------------------------------------------------------
  // if jumping 2 levels or more: backward - init start, anim start, forward: init target, anim target, 
  // control visible timeout
  // ---------------------------------------------------------------------------------------------------

  if (model.isActive && !isLeftButton) {
      setVariantsAnim({
        init: modelInitAnim,
        anim: modelTargetAnim,
      });
  } 

  if (!model.isActive && model.level - 1 === currentLevel && isLeftButton) {
    setVariantsAnim({
      init: modelTargetAnim,
      anim: fadeOutAnim,
    });
  }

  if (!model.isActive && model.level <  currentLevel && !isLeftButton) {
    setVariantsAnim({
      init: modelTargetAnim,
      anim: modelTargetAnim,
    });
  }


  // Cleanup function to clear timeout on effect cleanup
  return () => {
    if (timeoutDelay1) clearTimeout(timeoutDelay1);
  };

}, [isLeftButton, model.isActive, currentLevel, canClick]);



const handleAnimationComplete = () => {
  console.log("Animation finished!");
  // You can run any function here
};



return (
  <>
    {isClicked && <Html>
      <h4 onClick={backToStartPos} style={{ position: 'absolute', right: '260px', bottom: '200px'}}>x</h4>
    </Html> }
            <motion.group
                // position={
                //             !model.isActive ? 
                //             [model.targetPosition[0], model.targetPosition[1], model.targetPosition[2]] : 
                //             [model.startPosition[0], model.startPosition[1], model.startPosition[2]]
                //          }
                position={

                  [model.startPosition[0], model.startPosition[1], model.startPosition[2]]
              }
                transition={{ duration: 1, ease: "easeInOut" }}
                scale={[model.scale[0], model.scale[1], model.scale[2]]}
                //variants={onAnim ? variantsAnim : {}}
                variants={variantsAnim}
                initial={'init'}
                animate={'anim'}
                exit={'anim'}
                onClick={onClick} 
                onAnimationComplete={model.onAnimationComplete}
            >

            <motion.primitive 
                  object={clonedScene}  
                  onPointerEnter={handlePointerOver}
                  onPointerLeave={handlePointerOut}
            />
              {isHover && <Html position={[0, -0.3, 0]}>{model.name}</Html>}
            </motion.group>
  </>
)};


  
