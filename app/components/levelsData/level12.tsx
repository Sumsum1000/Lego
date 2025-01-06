import { Vector3Type } from "../../utils/Types";

const centerPosition = [0, 0, 0];
const startY = 8;

export const level12 = [
  {
    // R
    id: crypto.randomUUID(),
    url: '/3dModels/Level1/Lego_19_4211043.glb',
    name: '#5', //main body
    rotation: [0, 0, 0] as Vector3Type, 
    scale: [0.96, 1, 1] as Vector3Type, 
    startPosition: [7, startY, 0] as Vector3Type, 
    targetPosition: [5.165, 0.739, -5.610] as Vector3Type,  
    centerPosition: centerPosition as Vector3Type, 
    castShadow: true,
    receiveShadow: true,
    map: '/Group_2.jpg',
    color: 'white'
  },
  {
    // L
    id: crypto.randomUUID(),
    url: '/3dModels/Level1/Lego_19_4211043.glb',
    name: '#5', //main body
    rotation: [0, 0, 0] as Vector3Type, 
    scale: [0.96, 1, -1] as Vector3Type, 
    startPosition: [-7, startY, 0] as Vector3Type, 
    targetPosition: [-5.165, 0.739, -5.610] as Vector3Type,  
    centerPosition: centerPosition as Vector3Type, 
    castShadow: true,
    receiveShadow: true,
    map: '/Group_2.jpg',
    color: 'white'
  },
  {
    id: crypto.randomUUID(),
    url: '/3dModels/Level1/Lego_20R_6278445.glb',
    name: '#5', // short 2x2 - hinge
    rotation: [0, -90, 0] as Vector3Type, 
    scale: [-1, 1, 1] as Vector3Type, 
    startPosition: [3, startY, 0] as Vector3Type, 
    targetPosition: [7.62, 0.64, -6.04] as Vector3Type, 
    centerPosition: centerPosition as Vector3Type, 
    castShadow: true,
    receiveShadow: true,
    map: '/Group_2.jpg',
    color: 'white'
  },
  {
    id: crypto.randomUUID(),
    url: '/3dModels/Level1/Lego_20L_6278445.glb',
    name: '#5', // short 2x2 - hinge
    rotation: [0, 90, 0] as Vector3Type, 
    scale: [-1, 1, 1] as Vector3Type, 
    startPosition: [-3, startY, 0] as Vector3Type, 
    targetPosition: [-7.62, 0.64, -6.04] as Vector3Type, 
    centerPosition: centerPosition as Vector3Type, 
    castShadow: true,
    receiveShadow: true,
    map: '/Group_2.jpg',
    color: 'white'
  },
]


