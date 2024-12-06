import { Vector3Type } from "@/app/utils/Types";


const centerPosition = [0, 0, 0];
const startY = 8;

export const level14 = [
  {
    id: crypto.randomUUID(),
    url: '/3dModels/Level1/Lego_22L_6325254.glb',
    name: '#5', //main body
    rotation: [0, 0, 0] as Vector3Type, 
    scale: [1.05, 1.05, 1.05] as Vector3Type, 
    startPosition: [7, startY, 0] as Vector3Type, 
    targetPosition: [-6.322, 1.15, -5.609] as Vector3Type,  
    centerPosition: centerPosition as Vector3Type, 
    castShadow: true,
    receiveShadow: true,
    map: '/Group_2.jpg',
    color: 'white'
  },
  {
    id: crypto.randomUUID(),
    url: '/3dModels/Level1/Lego_21L_6405646.glb',
    name: '#5', //main body
    rotation: [0, 0, 0] as Vector3Type, 
    scale: [1.05, 1.05, 1.05] as Vector3Type,
    startPosition: [4, startY, 0] as Vector3Type, 
    targetPosition: [-6.322, 2.019, -5.609] as Vector3Type, 
    centerPosition: centerPosition as Vector3Type, 
    castShadow: true,
    receiveShadow: true,
    map: '/Group_2.jpg',
    color: 'white'
  },
  {
    id: crypto.randomUUID(),
    url: '/3dModels/Level1/Lego_23L_6290262.glb',
    name: '#5', // short 2x2 - hinge
    rotation: [0, 0, 0] as Vector3Type, 
    scale: [1.05, 1.05, 1.05] as Vector3Type,
    startPosition: [1, startY, 0] as Vector3Type, 
    targetPosition: [-6.322, 2, -6.969] as Vector3Type, 
    centerPosition: centerPosition as Vector3Type, 
    castShadow: true,
    receiveShadow: true,
    map: '/Group_2.jpg',
    color: 'white'
  },
  {
    id: crypto.randomUUID(),
    url: '/3dModels/Level1/Lego_23L_6290262.glb',
    name: '#5', // short 2x2 - hinge
    rotation: [0, 0, 0] as Vector3Type, 
    scale: [1.05, 1.05, -1.05] as Vector3Type,
    startPosition: [-1, startY, 0] as Vector3Type, 
    targetPosition: [-6.322, 2, -4.268] as Vector3Type, 
    centerPosition: centerPosition as Vector3Type, 
    castShadow: true,
    receiveShadow: true,
    map: '/Group_2.jpg',
    color: 'white'
  },
  {
    id: crypto.randomUUID(),
    url: '/3dModels/Level1/Lego_24L_6446786.glb',
    name: '#5', // short 2x2 - hinge
    rotation: [0, 0, 0] as Vector3Type, 
    scale: [1.05, 1.05, 1.05] as Vector3Type,
    startPosition: [-4, startY, 0]as Vector3Type, 
    targetPosition: [-6.322, 2.54, -5.609]as Vector3Type, 
    centerPosition: centerPosition as Vector3Type, 
    castShadow: true,
    receiveShadow: true,
    map: '/Group_2.jpg',
    color: 'white'
  },
  {
    id: crypto.randomUUID(),
    url: '/3dModels/Level1/Lego_25L_4653822.glb',
    name: '#5', // short 2x2 - hinge
    rotation: [0, 0, 0] as Vector3Type, 
    scale: [1.05, 1.05, 1.05] as Vector3Type,
    startPosition: [-7, startY, 0] as Vector3Type, 
    targetPosition: [-6.322, 2, -7.701] as Vector3Type , 
    centerPosition: centerPosition as Vector3Type, 
    castShadow: true,
    receiveShadow: true,
    map: '/Group_2.jpg',
    color: 'white'
  },
]


