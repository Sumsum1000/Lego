'use client'
import { useState } from 'react'
import { useGLTF, Bounds, Center } from '@react-three/drei'
import { ThreeEvent } from '@react-three/fiber'

type ControllerModelProps = {
  onEngineClick: () => void
  onFireClick: () => void
}

const ControllerModel = ({ onEngineClick, onFireClick }: ControllerModelProps) => {
  const { nodes } = useGLTF('/ControllerAll.glb')
  const [pressed, setPressed] = useState<'engine' | 'fire' | null>(null)

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

export default ControllerModel
