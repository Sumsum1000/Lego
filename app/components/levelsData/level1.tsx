import { Vector3Type } from "@/app/utils/Types";

const centerPosition = [0, 0, 0];
const startY = 8;

export const level1 = [

    {
      id: crypto.randomUUID(),
      url: '/3dModels/Level1/Lego_1_6469300.glb',
      name: '#6469300&', //main body
      rotation: [0, 0, 0] as Vector3Type, 
      scale: [1, 1, 1] as Vector3Type, 
      startPosition: [-6.8, startY, 0] as Vector3Type, 
      targetPosition: [0, 0, 0] as Vector3Type, 
      centerPosition: centerPosition as Vector3Type, 
      castShadow: true,
      receiveShadow: true,
      //map:'',
      color: 'white',
      map: 'Part_1_VRayCompleteMap.jpg',
    },
    {
      id: crypto.randomUUID(),
      url: '/3dModels/Level1/Lego_2_6265731.glb',
      name: '#6325254', // short 2x2 - hinge
      rotation: [90, 180, 0] as Vector3Type, 
      scale: [1, 1, 1] as Vector3Type, 
      startPosition: [5, startY, 0] as Vector3Type, 
      //targetPosition: [2.4, 0.84, 0.8] as Vector3Type, 
      targetPosition: [-0.8, 0.72, 2.376] as Vector3Type, 
      centerPosition: centerPosition as Vector3Type, 
      castShadow: true,
      receiveShadow: true,
      map: '/Group_1.jpg',
      color: 'white'
    },
    {
      id: crypto.randomUUID(),
      url: '/3dModels/Level1/Lego_2_6265731.glb',
      name: '#6325254',
      rotation: [90, 180, 0] as Vector3Type, 
      scale: [1, 1, 1] as Vector3Type, 
      startPosition: [10, startY, 0] as Vector3Type, 
      //targetPosition: [2.4, 0.84, -0.8] as Vector3Type, 
      targetPosition: [0.8, 0.72, 2.376] as Vector3Type, 
      centerPosition: centerPosition as Vector3Type, 
      castShadow: true,
      receiveShadow: true,
      map: '/Group_1.jpg',
      color: 'white'
    },
    {
      id: crypto.randomUUID(),
      url: '/3dModels/Level1/Lego_3_303721.glb',
      name: '#303721', // 1x4 triangle
      rotation: [90, 180, 0] as Vector3Type, 
      scale: [1.001, 1, 1] as Vector3Type, 
      startPosition: [1.5, startY, 0] as Vector3Type,  
      //targetPosition: [0.8, -0.47, 0.04] as Vector3Type, 
      targetPosition: [-0.01, 0.14, 1] as Vector3Type, 
      centerPosition: centerPosition as Vector3Type, 
      castShadow: true,
      receiveShadow: true,
      map: '/Group_1.jpg',
      color: 'white'
    },
// Lego_3_303721
]


