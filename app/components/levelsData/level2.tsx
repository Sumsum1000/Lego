import { Vector3Type } from "@/app/utils/Types";

const centerPosition = [0, 0, 0];
const startY = 8;
const degreesToRadians = (degrees: number) => degrees * (Math.PI / 180);

export const level2 = [

  {
    id: crypto.randomUUID(),
    //url: '/3dModels/Level2/5_6079007.glb',
    url: '/3dModels/Level1/Lego_4_6079008.glb',
    name: '#5', //main body
    rotation: [90, 180, 0] as Vector3Type, 
    scale: [1, 1, 1] as Vector3Type, 
    startPosition: [0, startY, 0] as Vector3Type, 
    //targetPosition: [1.55, 0.79, 0] as Vector3Type, 
    targetPosition: [0.02, 0.79, 1.44] as Vector3Type, 
    centerPosition: centerPosition as Vector3Type, 
    castShadow: true,
    receiveShadow: true,
    color: 'white',
    map: 'Group_1.jpg',
    shouldReset: false
  },
  {
    id: crypto.randomUUID(),
    url: '/3dModels/Level1/Lego_5R_4558212.glb',
    name: '#6', // short 2x2 - hinge
    rotation: [-90, 0, 180] as Vector3Type, 
    scale: [1, 1, 1] as Vector3Type, 
    startPosition: [3, startY, 0] as Vector3Type, 
    //targetPosition: [-3.24, 2.01, -2.14] as Vector3Type,
    targetPosition: [2.19, 1.93, -3.1] as Vector3Type,  
    centerPosition: centerPosition as Vector3Type, 
    castShadow: true,
    receiveShadow: true,
    color: 'white',
    map: 'Group_1.jpg',
    shouldReset: false
  },
  {
    id: crypto.randomUUID(),
    url: '/3dModels/Level1/Lego_5L_4558212.glb',
    name: '#6', // short 2x2 - hinge
    rotation: [90, 180, 0] as Vector3Type, 
    scale: [1, 1, 1] as Vector3Type, 
    startPosition: [-3, startY, 0] as Vector3Type, 
    //targetPosition: [-3.2, 2.01, 2.14] as Vector3Type, 
    targetPosition: [-2.19, 1.93, -3.37] as Vector3Type, 
    centerPosition: centerPosition as Vector3Type, 
    castShadow: true,
    receiveShadow: true,
    color: 'white',
    map: 'Group_1.jpg',
    shouldReset: false
  },

]


