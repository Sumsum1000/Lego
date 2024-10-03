'use client'

const centerPosition = [0, 0, 0];
const transition = 0.5;

export const modelsData = [
    // Level 1
    {
        id: crypto.randomUUID(),
        //url: '/3dModels/Level1/1_BaseBody.glb',
        url: '/3dModels/Lego_1.glb',
        name: '#6469300&', //main body
        rotation: [0, 90, 0], 
        scale: [1, 1, 1], 
        startPosition: [-0.68, 1.3, 0], 
        targetPosition: [0, 0, 0], 
        centerPosition: centerPosition, 
        castShadow: true,
        recieveShadow: true,
        //map:'',
        color: 'white',
        map: '/Leogo_maps/Part_1_VRayCompleteMap.jpg',
      },
      {
        id: crypto.randomUUID(),
        //url: '/3dModels/Level1/2_6265730.glb',    url: '/lego3D/Lego_1.glb',
        url: '/3dModels/Lego_2.glb',
        name: '#6325254', // short 2x2 - hinge
        rotation: [0, 90, 0], 
        scale: [1, 1, 1], 
        startPosition: [0.5, 1.3, 0], 
        targetPosition: [0.24, 0.084, 0.08], 
        centerPosition: centerPosition, 
        castShadow: true,
        recieveShadow: true,
        map: '/Leogo_maps/Test_complete.jpg',
        color: 'white'
      },
      {
        id: crypto.randomUUID(),
        //url: '/3dModels/Level1/2_6265730.glb',
        url: '/3dModels/Lego_2.glb',
        name: '#6325254',
        rotation: [0, 90, 0], 
        scale: [1, 1, 1], 
        startPosition: [1, 1.3, 0], 
        targetPosition: [0.24, 0.084, -0.08], 
        centerPosition: centerPosition, 
        castShadow: true,
        recieveShadow: true,
        map: '/Leogo_maps/Test_complete.jpg',
        color: 'white'
      },
      {
        id: crypto.randomUUID(),
        //url: '/3dModels/Level1/3_303721.glb',
        url: '/3dModels/Lego_3.glb',
        name: '#303721', // 1x4 triangle
        rotation: [0, 90, 0], 
        scale: [1, 1, 1], 
        startPosition: [1.5, 1.3, 0], 
        targetPosition: [0.079, 0.01, 0], 
        centerPosition: centerPosition, 
        castShadow: true,
        recieveShadow: true,
        map: '/Leogo_maps/Test_complete.jpg',
        color: 'white'
      },

      // Level 2
      {
        id: crypto.randomUUID(),
        url: '/3dModels/Lego_4.glb',
        name: '#5', //main body
        rotation: [0, 90, 0], 
        scale: [1, 1, 1], 
        startPosition: [-0.68, 1.3, 0], 
        targetPosition: [0.155, 0.079, 0], 
        centerPosition: centerPosition, 
        castShadow: true,
        recieveShadow: true,
        //map:'',
        color: 'white',
        //map: '/Leogo_maps/Part_1_VRayCompleteMap.jpg',
      },
      {
        id: crypto.randomUUID(),
        url: '/3dModels/Lego_5.glb',
        name: '#6', // short 2x2 - hinge
        rotation: [0, 90, 0], 
        scale: [1, 1, 1], 
        startPosition: [0.2, 1.3, 0], 
        targetPosition: [-0.32, 0.203, 0.2], 
        centerPosition: centerPosition, 
        castShadow: true,
        recieveShadow: true,
        //map:'',
        color: 'white',
        //map: '/Leogo_maps/Part_1_VRayCompleteMap.jpg',
      },
      {
        id: crypto.randomUUID(),
        url: '/3dModels/Lego_6_red.glb',
        name: '#6', // short 2x2 - hinge
        rotation: [0, 90, 0], 
        scale: [1, 1, -1], 
        startPosition: [1, 1.3, 0], 
        targetPosition: [-0.32, 0.203, -0.2], 
        centerPosition: centerPosition, 
        castShadow: true,
        recieveShadow: true,
        //map:'',
        color: 'white',
        //map: '/Leogo_maps/Part_1_VRayCompleteMap.jpg',
      },
    {
        id: crypto.randomUUID(),
        url: '/3dModels/Lego_6_white.glb',
        name: '#5', //main body
        rotation: [0, 90, 0], 
        scale: [1, 1, 1], 
        startPosition: [-0.68, 1.3, 0], 
        targetPosition: [0.155, 0.079, 0], 
        centerPosition: centerPosition, 
        castShadow: true,
        recieveShadow: true,
        color: 'white',
        //map: '/Leogo_maps/Part_1_VRayCompleteMap.jpg',
      },
      {
        id: crypto.randomUUID(),
        url: '/3dModels/Lego_7.glb',
        name: '#5', //main body
        rotation: [0, 90, 0], 
        scale: [1, 1, 1], 
        startPosition: [-0.68, 1.3, 0], 
        targetPosition: [0.155, 0.079, 0], 
        centerPosition: centerPosition, 
        castShadow: true,
        recieveShadow: true,
        color: 'white',
        //map: '/Leogo_maps/Part_1_VRayCompleteMap.jpg',
      },
      {
        id: crypto.randomUUID(),
        url: '/3dModels/Lego_8.glb',
        name: '#5', //main body
        rotation: [0, 90, 0], 
        scale: [1, 1, 1], 
        startPosition: [-0.68, 1.3, 0], 
        targetPosition: [0.155, 0.079, 0], 
        centerPosition: centerPosition, 
        castShadow: true,
        recieveShadow: true,
        color: 'white',
        //map: '/Leogo_maps/Part_1_VRayCompleteMap.jpg',
      },
      {
        id: crypto.randomUUID(),
        url: '/3dModels/Lego_9.glb',
        name: '#5', //main body
        rotation: [0, 90, 0], 
        scale: [1, 1, 1], 
        startPosition: [-0.68, 1.3, 0], 
        targetPosition: [0.155, 0.079, 0], 
        centerPosition: centerPosition, 
        castShadow: true,
        recieveShadow: true,
        color: 'white',
        //map: '/Leogo_maps/Part_1_VRayCompleteMap.jpg',
      },
]


