import { Vector3Type } from "@/app/utils/Types";


const centerPosition = [0, 0, 0];
const startY = 8;

export const level15 = [
  {
    id: crypto.randomUUID(),
    url: '/3dModels/Level1/Lego_26R_6214341.glb',
    name: '#5', //main body
    rotation: [0, 0, 0] as Vector3Type, 
    scale: [1, 1, 1] as Vector3Type,
    startPosition: [4, startY, -6] as Vector3Type, 
    targetPosition: [0.796, 0.229, -12.436] as Vector3Type,  
    centerPosition: centerPosition as Vector3Type, 
    castShadow: true,
    receiveShadow: true,
    map: '/Group_2.jpg',
    color: 'white'
  },
  {
    id: crypto.randomUUID(),
    url: '/3dModels/Level1/Lego_26L_6214341.glb',
    name: '#5', //main body
    rotation: [0, 0, 0] as Vector3Type, 
    scale: [1, 1, 1] as Vector3Type,
    startPosition: [-4, startY, -6] as Vector3Type, 
    targetPosition: [-0.789, 0.236, -12.440] as Vector3Type, 
    centerPosition: centerPosition as Vector3Type, 
    castShadow: true,
    receiveShadow: true,
    map: '/Group_2.jpg',
    color: 'white'
  },
  {
    id: crypto.randomUUID(),
    url: '/3dModels/Level1/Lego_7_6337639.glb',
    name: '#5', // short 2x2 - hinge
    rotation: [0, 180, 0] as Vector3Type, 
    scale: [1, 1, 1] as Vector3Type,
    startPosition: [1, startY, -6] as Vector3Type, 
    targetPosition: [1.196, 0.158, -13.282] as Vector3Type,
    centerPosition: centerPosition as Vector3Type, 
    castShadow: true,
    receiveShadow: true,
    map: '/Group_2.jpg',
    color: 'white'
  },
  {
    id: crypto.randomUUID(),
    url: '/3dModels/Level1/Lego_7_6337639.glb',
    name: '#5', // short 2x2 - hinge
    rotation: [0, 180, 0] as Vector3Type, 
    scale: [1, 1, 1] as Vector3Type,
    startPosition: [-1, startY, -6] as Vector3Type, 
    targetPosition: [-1.189, 0.158, -13.282] as Vector3Type,
    centerPosition: centerPosition as Vector3Type, 
    castShadow: true,
    receiveShadow: true,
    map: '/Group_2.jpg',
    color: 'white'
  },
]


