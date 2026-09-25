'use client'
import { useEffect, useState } from 'react'
import * as THREE from 'three'
import { useGLTF, useTexture, Bounds, Center } from '@react-three/drei'
import { ThreeEvent } from '@react-three/fiber'

type ControllerModelProps = {
  onEngineClick: () => void
  onFireClick: () => void
}

const ControllerModel = ({ onEngineClick, onFireClick }: ControllerModelProps) => {
  const { nodes } = useGLTF('/ControllerAll.glb')
  const [pressed, setPressed] = useState<'engine' | 'fire' | null>(null)

  const diffuseMap = useTexture('/ControllerDiffUse.jpg')
  diffuseMap.flipY = false
  diffuseMap.colorSpace = THREE.SRGBColorSpace

  useEffect(() => {
    // each <primitive object={nodes.X}/> below reparents that node out of the
    // GLTF's original scene graph and into ours, so `scene` ends up empty by
    // the time this runs - traverse the actual node references instead
    const controllerParts = [
      nodes.ControllerBody,
      nodes.ButtonBig,
      nodes.ButtonSmall,
      nodes.Object005Antena,
    ]

    controllerParts.forEach((part) => {
      part.traverse((child) => {
        if (!(child instanceof THREE.Mesh)) return
        const materials = Array.isArray(child.material) ? child.material : [child.material]
        materials.forEach((material) => {
          if (
            material instanceof THREE.MeshStandardMaterial ||
            material instanceof THREE.MeshPhysicalMaterial
          ) {
            material.map = diffuseMap
            // the original materials still carry their old flat baseColorFactor
            // (e.g. a strong saturated red) - three.js multiplies color * map,
            // so left as-is it tints/washes out the texture's own detail
            material.color.set(0xffffff)
            material.needsUpdate = true
          }
        })
      })
    })
  }, [nodes, diffuseMap])

  const handlePointerOver = (event: ThreeEvent<PointerEvent>) => {
    event.stopPropagation()
    document.body.style.cursor = 'pointer'
  }

  const handlePointerOut = (button: 'engine' | 'fire') => (event: ThreeEvent<PointerEvent>) => {
    event.stopPropagation()
    document.body.style.cursor = 'auto'
    setPressed((prev) => (prev === button ? null : prev))
  }

  const handlePointerDown = (button: 'engine' | 'fire') => (event: ThreeEvent<PointerEvent>) => {
    event.stopPropagation()
    // r3f's stopPropagation only blocks propagation between 3D objects, not the
    // underlying DOM event - without this the press still bubbles up to the
    // draggable wrapper and framer-motion starts a drag instead of a click
    event.nativeEvent.stopPropagation()
    setPressed(button)
  }

  const handlePointerUp = (button: 'engine' | 'fire') => (event: ThreeEvent<PointerEvent>) => {
    event.stopPropagation()
    setPressed((prev) => (prev === button ? null : prev))
  }

  const handleClick = (callback: () => void) => (event: ThreeEvent<MouseEvent>) => {
    event.stopPropagation()
    callback()
  }

  return (
    <Bounds fit clip observe margin={1.1}>
      <Center>
        {/* the source model's front (buttons) faces +Y and its top (antenna) faces -Z;
            rotate +90deg about X so buttons face the camera and the antenna points up */}
        <group rotation={[Math.PI / 2, 0, 0]}>
          <primitive object={nodes.ControllerBody} />
          <primitive object={nodes.Object005Antena} />
          <group
            scale={pressed === 'engine' ? 0.92 : 1}
            onClick={handleClick(onEngineClick)}
            onPointerOver={handlePointerOver}
            onPointerOut={handlePointerOut('engine')}
            onPointerDown={handlePointerDown('engine')}
            onPointerUp={handlePointerUp('engine')}
          >
            <primitive object={nodes.ButtonBig} />
          </group>
          <group
            scale={pressed === 'fire' ? 0.92 : 1}
            onClick={handleClick(onFireClick)}
            onPointerOver={handlePointerOver}
            onPointerOut={handlePointerOut('fire')}
            onPointerDown={handlePointerDown('fire')}
            onPointerUp={handlePointerUp('fire')}
          >
            <primitive object={nodes.ButtonSmall} />
          </group>
        </group>
      </Center>
    </Bounds>
  )
}

useGLTF.preload('/ControllerAll.glb')
useTexture.preload('/ControllerDiffUse.jpg')

export default ControllerModel
