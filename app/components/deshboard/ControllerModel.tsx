'use client'
import { useEffect, useMemo, useState } from 'react'
import * as THREE from 'three'
import { useGLTF, useTexture, Bounds, Center } from '@react-three/drei'
import { ThreeEvent } from '@react-three/fiber'

type ControllerModelProps = {
  onEngineClick: () => void
  onFireClick: () => void
}

// the true center of a mesh's rendered shape (geometry bounding box, with the
// node's own local translation/rotation/scale applied) - robust regardless of
// whether the source file encodes a part's position via its node transform or
// baked into the vertex data itself
function getLocalCenter(node: THREE.Mesh): [number, number, number] {
  node.updateMatrix()
  node.geometry.computeBoundingBox()
  const box = node.geometry.boundingBox!.clone().applyMatrix4(node.matrix)
  const center = box.getCenter(new THREE.Vector3())
  return [center.x, center.y, center.z]
}

function negate(v: [number, number, number]): [number, number, number] {
  return [-v[0], -v[1], -v[2]]
}

const ControllerModel = ({ onEngineClick, onFireClick }: ControllerModelProps) => {
  const { nodes } = useGLTF('/ControllerAll.glb')
  const [pressed, setPressed] = useState<'engine' | 'fire' | null>(null)

  // every node in this GLB (ControllerBody, ButtonEngine, ButtonFire, Antena)
  // shares the exact same translation/rotation/scale - it's a shared scene-
  // level transform, not per-button data - so each button's actual on-screen
  // position is baked into its vertex data instead. Compute the true center
  // from the transformed geometry bounding box rather than trusting .position.
  // Captured once (via useMemo), since nodes.X are persistent shared objects
  // and the underlying geometry doesn't change across re-renders.
  const engineButtonCenter = useMemo<[number, number, number]>(
    () => getLocalCenter(nodes.ButtonEngine as THREE.Mesh),
    [nodes],
  )
  const fireButtonCenter = useMemo<[number, number, number]>(
    () => getLocalCenter(nodes.ButtonFire as THREE.Mesh),
    [nodes],
  )

  const diffuseMap = useTexture('/ControllerDiffUse.jpg')
  diffuseMap.flipY = false
  diffuseMap.colorSpace = THREE.SRGBColorSpace

  useEffect(() => {
    // each <primitive object={nodes.X}/> below reparents that node out of the
    // GLTF's original scene graph and into ours, so `scene` ends up empty by
    // the time this runs - traverse the actual node references instead
    const controllerParts = [
      nodes.ControllerBody,
      nodes.ButtonEngine,
      nodes.ButtonFire,
      nodes.Antena,
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
          <primitive object={nodes.Antena} />
          {/* standard "scale about a pivot" construction: T(center) * S(k) *
              T(-center) - the outer group sits at the button's true center
              (so scaling it pivots there), the inner group cancels that
              offset back out, and the primitive keeps its original,
              untouched transform - this stays correct regardless of whether
              the button's position is encoded via its node transform or
              baked into the vertex data itself */}
          <group
            position={engineButtonCenter}
            scale={pressed === 'engine' ? 0.92 : 1}
            onClick={handleClick(onEngineClick)}
            onPointerOver={handlePointerOver}
            onPointerOut={handlePointerOut('engine')}
            onPointerDown={handlePointerDown('engine')}
            onPointerUp={handlePointerUp('engine')}
          >
            <group position={negate(engineButtonCenter)}>
              <primitive object={nodes.ButtonEngine} />
            </group>
          </group>
          <group
            position={fireButtonCenter}
            scale={pressed === 'fire' ? 0.92 : 1}
            onClick={handleClick(onFireClick)}
            onPointerOver={handlePointerOver}
            onPointerOut={handlePointerOut('fire')}
            onPointerDown={handlePointerDown('fire')}
            onPointerUp={handlePointerUp('fire')}
          >
            <group position={negate(fireButtonCenter)}>
              <primitive object={nodes.ButtonFire} />
            </group>
          </group>
        </group>
      </Center>
    </Bounds>
  )
}

useGLTF.preload('/ControllerAll.glb')
useTexture.preload('/ControllerDiffUse.jpg')

export default ControllerModel
