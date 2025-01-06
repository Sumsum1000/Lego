import { Vector3Type } from "../../utils/Types";


const centerPosition = [0, 0, 0];
const startY = 8;

export const level9 = [
  {
    id: crypto.randomUUID(),
    url: '/3dModels/Level1/Lego_14R_6331822.glb',
    name: '#5', //main body
    rotation: [0, 0, 0] as Vector3Type, 
    scale: [1, 1, 1] as Vector3Type, 
    startPosition: [3, startY, -6] as Vector3Type, 
    targetPosition: [2.082, 0.16, -4.869] as Vector3Type, 
    centerPosition: centerPosition as Vector3Type, 
    castShadow: true,
    receiveShadow: true,
    map: '/Group_2.jpg',
    color: 'white'
  },
  {
    id: crypto.randomUUID(),
    url: '/3dModels/Level1/Lego_14L_6331822.glb',
    name: '#5', //main body
    rotation: [0, 0, 0] as Vector3Type, 
    scale: [1, 1, 1] as Vector3Type, 
    startPosition: [-3, startY, -6] as Vector3Type, 
    targetPosition: [-2.082, 0, -4.869] as Vector3Type, 
    centerPosition: centerPosition as Vector3Type, 
    castShadow: true,
    receiveShadow: true,
    map: '/Group_2.jpg',
    color: 'white'
  },
  {
    id: crypto.randomUUID(),
    url: '/3dModels/Level1/Lego_15_6458585.glb',
    name: '#5', // short 2x2 - hinge
    rotation: [0, 0, 0] as Vector3Type, 
    scale: [1, 1, 1] as Vector3Type, 
    startPosition: [0, startY, -13] as Vector3Type, 
    targetPosition: [0, 0.3, -8.415] as Vector3Type, 
    centerPosition: centerPosition as Vector3Type, 
    castShadow: true,
    receiveShadow: true,
    map: '/Group_3.jpg',
    color: 'white'
  },
]


