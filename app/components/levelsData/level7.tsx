import { Vector3Type } from "@/app/utils/Types";

const centerPosition = [0, 0, 0];
const startY = 8;

export const level7 = [
  {
    id: crypto.randomUUID(),
    url: '/3dModels/Level1/Lego_10_6431017.glb',
    name: '#5', // short 2x2 - hinge
    rotation: [0, 0, 0] as Vector3Type, 
    scale: [-1, 1, 1] as Vector3Type, 
    startPosition: [7, startY, 0] as Vector3Type, 
    targetPosition: [0, 3.69, -3.24] as Vector3Type, 
    centerPosition: centerPosition as Vector3Type, 
    castShadow: true,
    receiveShadow: true,
     map: '/Group_2.jpg',
    color: 'white'
  },
  {
    id: crypto.randomUUID(),
    url: '/3dModels/Level1/Lego_10_6431017.glb',
    name: '#5', //main body
    rotation: [0, 0, 0] as Vector3Type, 
    scale: [-1, 1, 1] as Vector3Type, 
    startPosition: [-7, startY, 0] as Vector3Type, 
    targetPosition: [0, 3.69, -0.07] as Vector3Type, 
    centerPosition: centerPosition as Vector3Type, 
    castShadow: true,
    receiveShadow: true,
     map: '/Group_2.jpg',
    color: 'white'
  },
  {
    id: crypto.randomUUID(),
    url: '/3dModels/Level1/Lego_11_4211002.glb',
    name: '#5', // short 2x2 - hinge
    rotation: [0, 180, 0] as Vector3Type, 
    scale: [1, 1, 1] as Vector3Type, 
    startPosition: [0, startY, 0] as Vector3Type, 
    targetPosition: [0, 3.612, 2.3] as Vector3Type, 
    centerPosition: centerPosition as Vector3Type, 
    castShadow: true,
    receiveShadow: true,
     map: '/Group_2.jpg',
    color: 'white'
  },


]


