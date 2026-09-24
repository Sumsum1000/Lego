import { MathUtils } from "three";
import { motion } from "framer-motion-3d";
import React, { useMemo } from "react";
import Fire from "../fire/Fire";

type EngineFireType = {
  ringsPosition: [number, number, number];
  conePosition: [number, number, number];
};

const FIRE_COUNT = 6;
const FIRE_SCALE = 3;
const FIRE_Z_SCALE_MULT = 2; // extra stretch along Z on top of FIRE_SCALE
const FIRE_LENGTH_Z = 1.2 * FIRE_Z_SCALE_MULT; // approximate Z depth of a single fire mesh at FIRE_SCALE
const OVERLAP = 0.5; // fraction of a mesh's length the next one overlaps by
const SPACING = FIRE_LENGTH_Z * (1 - OVERLAP) * 0.5;

// per-mesh scaleX/scaleY multiplier on top of FIRE_SCALE, by index; unlisted indices default to 1
const XY_SCALE_MULT: Record<number, number> = {
  0: 1.5,
  1: 1.25,
  [FIRE_COUNT - 1]: 0.75,
};

const APPEAR_TOTAL_DURATION = 0.2; // all meshes fully scaled in by this many seconds
const APPEAR_STEP = APPEAR_TOTAL_DURATION / FIRE_COUNT;

const EngineFire = ({ ringsPosition, conePosition }: EngineFireType) => {
  // random fixed Z rotation per mesh, so they don't all look identical
  const rotationsZ = useMemo(
    () => Array.from({ length: FIRE_COUNT }, () => Math.random() * Math.PI * 2),
    [],
  );

  return (
    <>
      <mesh position={conePosition} rotation={[MathUtils.degToRad(90), 0, 0]}>
        <coneGeometry args={[0.2, 9, 8]} />
        <motion.meshBasicMaterial transparent={true} opacity={0.5} color={"#039be5"} />
      </mesh>
      {rotationsZ.map((rotationZ, index) => {
        const xyScale = FIRE_SCALE * (XY_SCALE_MULT[index] ?? 1);
        const zScale = FIRE_SCALE * FIRE_Z_SCALE_MULT;
        return (
          <motion.group
            key={index}
            position={[
              ringsPosition[0],
              ringsPosition[1],
              ringsPosition[2] + index * SPACING,
            ]}
            initial={{ scaleX: 0, scaleY: 0, scaleZ: 0 }}
            animate={{
              // cartoon squash-and-stretch: overshoot longer + pinch narrower
              // at the peak, then rebound to the real size
              scaleX: [0, xyScale * 0.7, xyScale],
              scaleY: [0, xyScale * 0.7, xyScale],
              scaleZ: [0, zScale * 1.35, zScale],
            }}
            transition={{
              duration: APPEAR_STEP,
              delay: index * APPEAR_STEP,
              times: [0, 0.6, 1],
              ease: 'easeOut',
            }}
          >
            <Fire rotation={[0, 0, rotationZ]} />
          </motion.group>
        );
      })}
    </>
  );
};

export default EngineFire;
