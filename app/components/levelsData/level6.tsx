import { Vector3Type } from "@/app/utils/Types";

const centerPosition = [0, 0, 0];
const startY = 8;

export const level6 = [
  {
    id: crypto.randomUUID(),
    url: '/3dModels/Level1/Lego_9L_6385619.glb',
    name: '#5', //main body
    rotation: [90, 0, 180], 
    scale: [1, 1, -1], 
    startPosition: [-3, startY, 0], 
    targetPosition: [-1.976, 2.119, 2.71], 
    centerPosition: centerPosition, 
    castShadow: true,
    receiveShadow: true,
    map: '/Group_1.jpg',
    color: 'white'
  },
  {
    id: crypto.randomUUID(),
    url: '/3dModels/Level1/Lego_9R_6385619.glb',
    name: '#5', // short 2x2 - hinge
    rotation: [-90, 0, 180], 
    scale: [1, 1, 1], 
    startPosition: [3, startY, 0], 
    targetPosition: [1.976, 2.119, 2.71], 
    centerPosition: centerPosition, 
    castShadow: true,
    receiveShadow: true,
    map: '/Group_1.jpg',
    color: 'white'
  },



]


