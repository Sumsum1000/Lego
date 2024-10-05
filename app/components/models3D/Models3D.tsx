import React, { useMemo, useRef, useState, useEffect } from 'react';
import { clone } from 'three/examples/jsm/utils/SkeletonUtils.js';
import { useGLTF, Html, useTexture } from '@react-three/drei';
import { Object3D, Vector3, Euler, Mesh } from 'three';
import { motion } from 'framer-motion-3d';
import { useAnimation } from 'framer-motion';
import { ThreeEvent } from '@react-three/fiber';
import {  ModelProps, } from '@/app/utils/Types';
import * as THREE from 'three';
import { useClickStore } from '../store/Store';


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

const diffuseMap = model.map ? useTexture(model.map) : null;

const clickStore = useClickStore();
const [isHover, setIsHover] = useState(false);
const [isClicked, setIsClicked] = useState(false);
const [gltfPosition, setGltfPosition] = useState();

const {setLeftClick, setRightClick, setNoneClick} = clickStore
const currentClick = clickStore.currentClick;

const modelInitAnim = {x: model.startPosition[0], y: model.startPosition[1], z: model.startPosition[2], transition: {duration: 1, delay: model.delayIn}}
const modelTargetAnim = {x: model.targetPosition[0], y: model.targetPosition[1], z: model.targetPosition[2], transition: {duration: 1, delay: model.delayOut}}

const [variantsAnim, setVariantsAnim] = useState({
  init: { ...modelInitAnim , transition: {duration: 1, delay: model.delayIn}},
  anim: {...modelInitAnim , transition: {duration: 1, delay: model.delayIn}},
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

const newMaterial = new THREE.MeshBasicMaterial({
  color: model.color || 'white',
  map: diffuseMap,
  //metalness: 0
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

// ------------------------------
const delayAndAnimateForward = () => {
  // fade in
  // target point  = start point
  setVariantsAnim({
    init: modelInitAnim,
    anim: modelInitAnim
  });
  // wait 1000ms
   // target point = target point - animation forward
  setTimeout(() => {
    setVariantsAnim({
      init: modelInitAnim,
      anim: modelTargetAnim
    });
  }, 1000)
 
}

const delayAndAnimateBackward = () => {
  setVariantsAnim({
    init: modelTargetAnim,
    anim: modelInitAnim
  });
}


useEffect(() => {
    controls.start({ scale: 1 });
}, [controls]);


useEffect(() => {
  setOnAnim(false)
  const timeOut = setTimeout(() => {
    setOnAnim(true)
  }, 100)

  return(() => {
    clearTimeout(timeOut)
  })
}, [])

// useEffect(() => {
//   if (!model.isLeftArrowClicked && model.isActive) {
//     setVariantsAnim({
//         init: modelInitAnim,
//         anim: modelTargetAnim
//     });
//   }
//   if (model.isLeftArrowClicked && model.isActive) {
//     setVariantsAnim({
//         init: modelTargetAnim,
//         anim: modelInitAnim
//     });
//   }
//   if (!model.isActive) {
//       setVariantsAnim({
//           init: modelTargetAnim,
//           anim: modelTargetAnim
//       });
//   } 
// }, [model.isLeftArrowClicked, model.isActive, variantsAnim]);

useEffect(() => {
  if(model.isActive && model.isLeftArrowClicked){
    setVariantsAnim({
        init: modelInitAnim,
        anim: modelTargetAnim
    });
  }
  if(model.isActive && !model.isLeftArrowClicked){
    setVariantsAnim({
        init: modelTargetAnim,
        anim: modelInitAnim
    });
  }
}, [model.isLeftArrowClicked, model.isActive, variantsAnim]);



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
            onClick={onClick} 
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


  
