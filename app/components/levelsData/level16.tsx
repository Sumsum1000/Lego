import { Vector3Type } from "../../utils/Types";



const centerPosition = [0, 0, 0];
const startY = 8;

export const level16 = [
  // {
  //   id: crypto.randomUUID(),
  //   url: '/3dModels/Level1/Lego_28_4211206.glb',
  //   name: '#5', //main body
  //   rotation: [0, 0, 0] as Vector3Type, 
  //   scale: [1, 1, 1] as Vector3Type,
  //   startPosition: [3, startY, -6] as Vector3Type, 
  //   targetPosition: [0, 0.356, -8.256] as Vector3Type,  
  //   centerPosition: centerPosition as Vector3Type, 
  //   castShadow: true,
  //   receiveShadow: true,
  //   map: '/Group_2.jpg',
  //   color: 'white'
  // },
  {
    id: crypto.randomUUID(),
    url: '/3dModels/Level1/Cockpit.glb',
    name: '#5', //main body
    rotation: [0, 0, 0] as Vector3Type, 
    scale: [0.93, 0.93, 0.93] as Vector3Type,
    startPosition: [-3, startY, -6] as Vector3Type, 
    targetPosition: [0, 2.8, -8.62] as Vector3Type, 
    centerPosition: centerPosition as Vector3Type, 
    castShadow: true,
    receiveShadow: true,
    map: '/Cockpit.jpg',
    color: 'white'
  },
]


