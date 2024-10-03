import { Vector3Type } from "@/app/utils/Types";

const centerPosition = [0, 0, 0];
const startY = 7;
const color7 = '#75d1ce'

export const level4 = [
  {
    id: crypto.randomUUID(),
    url: '/3dModels/Level1/Lego_7_6337639.glb',
    name: '#5', //main body
    rotation: [0, 0, 0] as Vector3Type, 
    scale: [1, 1, 1] as Vector3Type, 
    startPosition: [6, startY, 0] as Vector3Type, 
    //targetPosition: [-1.87, 0.88, -3.59] as Vector3Type, 
    targetPosition: [3.572, 0.924, -1.819] as Vector3Type, 
    centerPosition: centerPosition as Vector3Type, 
    castShadow: true,
    receiveShadow: true,
    map: '',
    color: color7
  },
  {
    id: crypto.randomUUID(),
    url: '/3dModels/Level1/Lego_7_6337639.glb',
    name: '#6', 
    rotation: [0, 0, 0] as Vector3Type, 
    scale: [1, 1, 1] as Vector3Type, 
    startPosition: [3, startY, 0] as Vector3Type, 
    //targetPosition: [-1.87, 0.88, -2.78] as Vector3Type, 
    targetPosition: [2.768, 0.924, -1.819] as Vector3Type, 
    centerPosition: centerPosition as Vector3Type, 
    castShadow: true,
    receiveShadow: true,
    color: color7,
    map: ''
  },
  {
    id: crypto.randomUUID(),
    url: '/3dModels/Level1/Lego_7_6337639.glb',
    name: '#5', //main body
    rotation: [0, 0, 0] as Vector3Type, 
    scale: [1, 1, 1] as Vector3Type, 
    startPosition: [-6, startY, 0] as Vector3Type, 
    //targetPosition: [-1.87, 0.92, 2.81] as Vector3Type, 
    targetPosition: [-2.775, 0.924, -1.819] as Vector3Type, 
    centerPosition: centerPosition as Vector3Type, 
    castShadow: true,
    receiveShadow: true,
    color: color7,
    map: ''
  },
  {
    id: crypto.randomUUID(),
    url: '/3dModels/Level1/Lego_7_6337639.glb',
    name: '#5', //main body
    rotation: [0, 0, 0] as Vector3Type, 
    scale: [1, 1, 1] as Vector3Type, 
    startPosition: [-3, startY, 0] as Vector3Type, 
    //targetPosition: [-1.87, 0.92, 3.61] as Vector3Type , 
    targetPosition: [-3.576, 0.924, -1.819] as Vector3Type, 
    centerPosition: centerPosition as Vector3Type, 
    castShadow: true,
    receiveShadow: true,
    color: color7,
    map: ''
  },

]


