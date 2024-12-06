import { Vector3Type } from "@/app/utils/Types";

const centerPosition = [0, 0, 0];
const startY = 8;


export const level11 = [
  {
    id: crypto.randomUUID(),
    url: '/3dModels/Level1/Lego_18R_300921.glb',
    name: '#5', // short 2x2 - hinge
    rotation: [0, 0, 0] as Vector3Type, 
    scale: [-1, 1, 1] as Vector3Type, 
    startPosition: [5, startY, 0] as Vector3Type, 
    targetPosition: [1.982, 1.17, -7.203] as Vector3Type, 
    centerPosition: centerPosition as Vector3Type, 
    castShadow: true,
    receiveShadow: true,
    map: '/Group_2.jpg',
    color: 'white'
  },
  {
    id: crypto.randomUUID(),
    url: '/3dModels/Level1/Lego_18L_300921.glb',
    name: '#5', // short 2x2 - hinge
    rotation: [0, 0, 0] as Vector3Type, 
    scale: [-1, 1, 1] as Vector3Type, 
    startPosition: [-5, startY, 0] as Vector3Type, 
    targetPosition: [-1.974, 1.17, -7.183] as Vector3Type, 
    centerPosition: centerPosition as Vector3Type, 
    castShadow: true,
    receiveShadow: true,
    map: '/Group_2.jpg',
    color: 'white'
  },
  {
    id: crypto.randomUUID(),
    url: '/3dModels/Level1/Lego_16L_4160390.glb',
    name: '#5', //main body
    rotation: [0, 0, 0] as Vector3Type, 
    scale: [1, 1, 1] as Vector3Type, 
    startPosition: [2, startY, 0] as Vector3Type, 
    targetPosition: [1.983, 2.1, -6.5] as Vector3Type, 
    centerPosition: centerPosition as Vector3Type, 
    castShadow: true,
    receiveShadow: true,
    map: '/Group_2.jpg',
    color: 'white'
  },
  {
    id: crypto.randomUUID(),
    url: '/3dModels/Level1/Lego_16R_4160390.glb',
    name: '#5', //main body
    rotation: [0, 0, 0] as Vector3Type, 
    scale: [1, 1, 1] as Vector3Type, 
    startPosition: [-2, startY, 0] as Vector3Type, 
    targetPosition: [-1.974, 2.1, -6.5] as Vector3Type,  
    centerPosition: centerPosition as Vector3Type, 
    castShadow: true,
    receiveShadow: true,
    map: '/Group_2.jpg',
    color: 'white'
  }
]


