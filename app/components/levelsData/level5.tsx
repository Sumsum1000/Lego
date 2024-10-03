import { Vector3Type } from "@/app/utils/Types";

const centerPosition = [0, 0, 0];
const startY = 8;

export const level5 = [
  {
    id: crypto.randomUUID(),
    url: '/3dModels/Level1/Lego_5L_4558212.glb',
    name: '#5', //main body
    rotation: [-90, 0, 180] as Vector3Type, 
    scale: [1, 1, 1] as Vector3Type, 
    startPosition: [-5, startY, 0] as Vector3Type, 
    targetPosition: [-2.14, 2.02, -0.01] as Vector3Type, 
    centerPosition: centerPosition as Vector3Type, 
    castShadow: true,
    receiveShadow: true,
    map: '/Group_1.jpg',
    color: 'white'
  },
  {
    id: crypto.randomUUID(),
    url: '/3dModels/Level1/Lego_5R_4558212.glb',
    name: '#5', // short 2x2 - hinge
    rotation: [-90, 0, 180] as Vector3Type, 
    scale: [1, 1, 1] as Vector3Type, 
    startPosition: [5, startY, 0] as Vector3Type, 
    //targetPosition: [-0.06, 2.01, -2.14] as Vector3Type, 
    targetPosition: [2.137, 2.02, -0.043] as Vector3Type,
    centerPosition: centerPosition as Vector3Type, 
    castShadow: true,
    receiveShadow: true,
    map: '/Group_1.jpg',
    color: 'white'
  },
  {
    id: crypto.randomUUID(),
    url: '/3dModels/Level1/Lego_8_6266281.glb',
    name: '#5', // short 2x2 - hinge
    rotation: [-76.6, 0, 180] as Vector3Type, 
    scale: [1, 1, 1] as Vector3Type, 
    startPosition: [0, startY, 0] as Vector3Type, 
    //targetPosition: [2.87, 2.33, 0] as Vector3Type, 
    targetPosition: [-0.013, 2.302, 3.2] as Vector3Type, 
    centerPosition: centerPosition as Vector3Type, 
    castShadow: true,
    receiveShadow: true,
    map: '/Group_1.jpg',
    color: 'white'
  },


]


