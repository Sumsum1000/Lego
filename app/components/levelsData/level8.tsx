import { Vector3Type } from "../../utils/Types";


const centerPosition = [0, 0, 0];
const startY = 8;

export const level8 = [
  {
    id: crypto.randomUUID(),
    url: '/3dModels/Level1/Lego_12R_416201.glb',
    name: '#5', //main body
    rotation: [0, 180, 0] as Vector3Type, 
    scale: [1, 1, -1] as Vector3Type, 
    startPosition: [1, startY, 0] as Vector3Type, 
    targetPosition: [1.186, 4.018, -1.634] as Vector3Type, 
    centerPosition: centerPosition as Vector3Type, 
    castShadow: true,
    receiveShadow: true,
     map: '/Group_2.jpg',
    color: 'white'
  },
  {
    id: crypto.randomUUID(),
    url: '/3dModels/Level1/Lego_12L_416201.glb',
    name: '#5', //main body
    rotation: [0, 180, 0] as Vector3Type, 
    scale: [1, 1, -1] as Vector3Type, 
    startPosition: [-1, startY, 0] as Vector3Type, 
    targetPosition: [-1.186, 4.018, -1.634] as Vector3Type, 
    centerPosition: centerPosition as Vector3Type, 
    castShadow: true,
    receiveShadow: true,
     map: '/Group_2.jpg',
    color: 'white'
  },
  {
    id: crypto.randomUUID(),
    url: '/3dModels/Level1/Lego_13_4211065.glb',
    name: '#5', // short 2x2 - hinge
    rotation: [0, 180, 0] as Vector3Type, 
    scale: [1, 1, 1] as Vector3Type, 
    startPosition: [-3, startY, 0] as Vector3Type, 
    targetPosition: [0, 4.112, -0.048] as Vector3Type, 
    centerPosition: centerPosition as Vector3Type, 
    castShadow: true,
    receiveShadow: true,
    map: '/Group_2.jpg',
    color: 'white'
  },
  {
    id: crypto.randomUUID(),
    url: '/3dModels/Level1/Lego_13_4211065.glb',
    name: '#5', // short 2x2 - hinge
    rotation: [0, 180, 0] as Vector3Type, 
    scale: [1, 1, 1] as Vector3Type, 
    startPosition: [3, startY, 0] as Vector3Type, 
    targetPosition: [0, 4.112, -3.227] as Vector3Type, 
    centerPosition: centerPosition as Vector3Type, 
    castShadow: true,
    receiveShadow: true,
    map: '/Group_2.jpg',
    color: 'white'
  },


]


