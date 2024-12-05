import { Vector3Type } from "@/app/utils/Types";

const centerPosition = [0, 0, 0];
const startY = 8;

export const level10 = [
  {
    id: crypto.randomUUID(),
    url: '/3dModels/Level1/Lego_16L_4160390.glb',
    name: '#5', //main body
    rotation: [0, 0, 0] as Vector3Type, 
    scale: [1, 1, 1] as Vector3Type, 
    startPosition: [2, startY, 0] as Vector3Type, 
    targetPosition: [3.559, 1.1, -4.84] as Vector3Type, 
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
    targetPosition: [-3.559, 1.1, -4.84] as Vector3Type, 
    centerPosition: centerPosition as Vector3Type, 
    castShadow: true,
    receiveShadow: true,
    map: '/Group_2.jpg',
    color: 'white'
  },
  {
    id: crypto.randomUUID(),
    url: '/3dModels/Level1/Lego_17L_6467214.glb',
    name: '#5', // short 2x2 - hinge
    rotation: [0, 0, 0] as Vector3Type, 
    scale: [1, 1, 1] as Vector3Type, 
    startPosition: [5, startY, 0] as Vector3Type, 
    targetPosition: [3.078, 1.4, -6.907] as Vector3Type, 
    centerPosition: centerPosition as Vector3Type, 
    castShadow: true,
    receiveShadow: true,
    map: '/Cockpit.jpg',
    color: 'white'
  },
  {
    id: crypto.randomUUID(),
    url: '/3dModels/Level1/Lego_17R_6467214.glb',
    name: '#5', // short 2x2 - hinge
    rotation: [0, 0, 0] as Vector3Type, 
    scale: [1, 1, 1] as Vector3Type, 
    startPosition: [-5, startY, 0] as Vector3Type, 
    targetPosition: [-3.3, 1.45, -5.7] as Vector3Type, 
    centerPosition: centerPosition as Vector3Type, 
    castShadow: true,
    receiveShadow: true,
    map: '/Cockpit.jpg',
    color: 'white'
  },
]


