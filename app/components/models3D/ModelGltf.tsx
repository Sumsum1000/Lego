import React, { useMemo, useRef, useState, useEffect, useLayoutEffect } from 'react';
import { clone } from 'three/examples/jsm/utils/SkeletonUtils.js';
import { useGLTF, Html, useTexture, useEnvironment } from '@react-three/drei';
import { Object3D, Vector3, Euler, Mesh, Material, MeshStandardMaterial } from 'three';
import { motion } from 'framer-motion-3d';
import { useAnimation } from 'framer-motion';
import { ThreeEvent } from '@react-three/fiber';
import { Position, Rotation, Scale, Transition, ModelProps, EventHandlers, MaterialProps } from '@/app/utils/Types';
import * as THREE from 'three';

const degreesToRadians = (degrees: number) => degrees * (Math.PI / 180);


  // Type guard to check if an object is a Mesh
  const isMesh = (obj: Object3D): obj is Mesh => {
    return (obj as Mesh).isMesh !== undefined;
  };

  export type xxx = {
    model: {
      url: string;
      name: string;
      level?: string;
      isActive: boolean;
      // castShadow: boolean;
      // receiveShadow: boolean;
      startPosition: Position;
      targetPosition: Position;
      rotation: Rotation;
      scale: Scale;
      transitionScale: Transition;
      isLeftArrowClicked: boolean;
      delayIn: number;
      delayOut: number;
      color?: string;
      map?: string;
      material?: MeshStandardMaterial;
    }
  } & EventHandlers & MaterialProps ;


export const ModelGltf = ({ 
  model,
  onPointerOver, 
  onPointerOut,
}: ModelProps) => {
const { scene, nodes, materials } = useGLTF(model.url, true);
const clonedScene = useMemo(() => clone(scene), [scene]);

const diffuseMap = model.map ? useTexture(model.map) : null;


const [isHover, setIsHover] = useState(false);
const [isClicked, setIsClicked] = useState(false);

const [variantsAnim, setVariantsAnim] = useState({
  init: { x: model.startPosition[0], y: model.startPosition[1], z: model.startPosition[2], scaleX: model.scale[0], scaleY: model.scale[1], scaleZ: model.scale[2], transition: {duration: 1, delay: model.delayIn}},
  anim: {x: model.targetPosition[0], y: model.targetPosition[1], z: model.targetPosition[2], transition: {duration: 1, delay: model.delayOut}},
});

console.log(clonedScene.children[0].children[0])
//console.log(clonedScene)
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
})


// Enable shadows for all meshes in the scene
clonedScene.traverse((child) => {
  
  if (child instanceof Object3D && (child as any).isMesh) {
    //child.castShadow = true;
    //child.receiveShadow = true;
    const mesh = child as THREE.Mesh;
    mesh.material = newMaterial;
  }
});



const onClick = () => {
  console.log('Clicked2')
  setIsClicked(true);
  setIsHover(false);
}

const handlePointerOver = (event: ThreeEvent<PointerEvent>) => {
  if (onPointerOver) onPointerOver(event);
  setIsHover(true);
};

const handlePointerOut = (event: ThreeEvent<PointerEvent>) => {
  if (onPointerOut) onPointerOut(event);
  setIsHover(false);
};


useEffect(() => {
    controls.start({ scale: 1 });
}, [controls]);

useEffect(() => {
  if (!model.isActive) {
      setVariantsAnim({
          init: { 
              x: model.startPosition[0], 
              y: model.startPosition[1], 
              z: model.startPosition[2], 
              scaleX: model.scale[0], 
              scaleY: model.scale[1], 
              scaleZ: model.scale[2], 
              transition: { duration: 1, delay: model.delayIn }
          },
          anim: { 
              x: model.targetPosition[0], 
              y: model.targetPosition[1], 
              z: model.targetPosition[2], 
              transition: { duration: 0.2, delay: model.delayOut }
          }
      });
  } else if (model.isLeftArrowClicked && model.isActive) {
      setVariantsAnim({
          init: { 
              x: model.targetPosition[0], 
              y: model.targetPosition[1], 
              z: model.targetPosition[2], 
              scaleX: model.scale[0], 
              scaleY: model.scale[1], 
              scaleZ: model.scale[2], 
              transition: { duration: 1, delay: model.delayIn }
          },
          anim: { 
              x: model.startPosition[0], 
              y: model.startPosition[1], 
              z: model.startPosition[2], 
              transition: { duration: 1, delay: model.delayIn }
          }
      });
  } else if (!model.isLeftArrowClicked && model.isActive) {
      setVariantsAnim({
          init: { 
              x: model.startPosition[0], 
              y: model.startPosition[1], 
              z: model.startPosition[2], 
              scaleX: model.scale[0], 
              scaleY: model.scale[1], 
              scaleZ: model.scale[2], 
              transition: { duration: 1, delay: model.delayIn }
          },
          anim: { 
              x: model.targetPosition[0], 
              y: model.targetPosition[1], 
              z: model.targetPosition[2], 
              transition: { duration: 1, delay: model.delayOut }
          }
      });
  }
}, [model.isLeftArrowClicked, model.isActive]);


return (
  <>
    {isClicked && <Html>
      <h4  style={{ position: 'absolute', right: '260px', bottom: '200px'}}>x</h4>
    </Html> }
        {/* <motion.group
            position={[model.startPosition[0], model.startPosition[1], model.startPosition[2]]}
            transition={{ duration: 1, ease: "easeInOut" }}
            rotation={[model.rotation[0], 39, model.rotation[2]]}
            scale={[model.scale[0], model.scale[1], model.scale[2]]}
            variants={variantsAnim}
            animate={'anim'}
            onClick={onClick} 
        > */}

        <motion.primitive 
               position={[model.startPosition[0], model.startPosition[1], model.startPosition[2]]}
               transition={{ duration: 1, ease: "easeInOut" }}
               rotation={[model.rotation[0], 39, model.rotation[2]]}
               scale={[model.scale[0], model.scale[1], model.scale[2]]}
               variants={variantsAnim}
               animate={'anim'}

              object={clonedScene}  
              onPointerEnter={handlePointerOver}
              onPointerLeave={handlePointerOut}
              
        />
      {isHover && <Html position={[0, -0.3, 0]}>{model.name}</Html>}
        {/* </motion.group> */}
  </>
)};








  
