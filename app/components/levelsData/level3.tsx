import { Vector3Type } from "@/app/utils/Types";

const centerPosition = [0, 0, 0];
const startY = 8;

export const level3 = [
  {
    id: crypto.randomUUID(),
    //url: '/3dModels/Level2/5_6079007.glb',
    url: '/3dModels/Level1/Lego_6L_red_6019155.glb',
    name: '#5', //main body
    rotation: [-90, 0, 180] as Vector3Type, 
    scale: [1, 1, 1] as Vector3Type, 
    startPosition: [6, startY, 0] as Vector3Type, 
    //targetPosition: [-2.76, 1.05, 3.17] as Vector3Type, 
    targetPosition: [3.168, 1.055, -2.735] as Vector3Type, 
    centerPosition: centerPosition as Vector3Type, 
    castShadow: true,
    receiveShadow: true,
    map: '/Group_1.jpg',
    color: 'white'
  },
  {
    id: crypto.randomUUID(),
    url: '/3dModels/Level1/Lego_6L_white_30040.glb',
    name: '#6', // short 2x2 - hinge
    rotation: [-90, 0, 0] as Vector3Type, 
    scale: [-1.02, -1, 1.02] as Vector3Type, 
    //scale: [1.02, 1, 1.02] as Vector3Type, 
    startPosition: [3, startY, 0] as Vector3Type, 
    //targetPosition: [-4.02, 1.05, 2.77] as Vector3Type, 
    targetPosition: [2.772, 1.055, -3.987] as Vector3Type, 
    centerPosition: centerPosition as Vector3Type, 
    castShadow: true,
    receiveShadow: true,
    map: '/Group_1.jpg',
    color: 'white'
  },
  {
    id: crypto.randomUUID(),
    //url: '/3dModels/Level2/5_6079007.glb',
    url: '/3dModels/Level1/Lego_6R_red_6019155.glb',
    name: '#5', //main body
    rotation: [-90, 0, 180] as Vector3Type, 
    scale: [1, 1, 1] as Vector3Type, 
    startPosition: [-6, startY, 0] as Vector3Type, 
    //targetPosition: [-2.76, 1.0, -3.15] as Vector3Type, 
    targetPosition: [-3.168, 1.055, -2.735] as Vector3Type, 
    centerPosition: centerPosition as Vector3Type, 
    castShadow: true,
    receiveShadow: true,
    map: '/Group_1.jpg',
    color: 'white'
  },
  {
    id: crypto.randomUUID(),
    url: '/3dModels/Level1/Lego_6R_white_30040.glb',
    name: '#6', // short 2x2 - hinge
    rotation: [-90, 0, 0] as Vector3Type, 
    scale: [-1.02, -1, 1.02] as Vector3Type, 
    startPosition: [-3, startY, 0] as Vector3Type, 
    //targetPosition: [-4.01, 1, -2.77] as Vector3Type, 
    targetPosition: [-2.772, 1.055, -3.987] as Vector3Type,
    centerPosition: centerPosition as Vector3Type, 
    castShadow: true,
    receiveShadow: true,
    map: '/Group_1.jpg',
    color: 'white'
  },

]


