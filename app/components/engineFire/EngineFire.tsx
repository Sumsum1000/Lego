import { MathUtils } from "three";
import { motion } from "framer-motion-3d";
import React, { useMemo } from "react";
import Fire, { FireInstanceConfig } from "../fire/Fire";

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
  // one instanced draw call for all 6 fire meshes instead of 6 separate ones
  const fireInstances = useMemo<FireInstanceConfig[]>(
    () =>
      Array.from({ length: FIRE_COUNT }, (_, index) => {
        const xyScale = FIRE_SCALE * (XY_SCALE_MULT[index] ?? 1);
        const zScale = FIRE_SCALE * FIRE_Z_SCALE_MULT;
        return {
          position: [
            ringsPosition[0],
            ringsPosition[1],
            ringsPosition[2] + index * SPACING,
          ],
          rotationZ: Math.random() * Math.PI * 2,
          targetScale: [xyScale, xyScale, zScale],
          appearDelay: index * APPEAR_STEP,
        };
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  return (
    <>
      <mesh position={conePosition} rotation={[MathUtils.degToRad(90), 0, 0]}>
        <coneGeometry args={[0.2, 9, 8]} />
        <motion.meshBasicMaterial transparent={true} opacity={0.5} color={"#039be5"} />
      </mesh>
      <Fire instances={fireInstances} appearDuration={APPEAR_STEP} />
    </>
  );
};

export default EngineFire;
