
import { Model } from '../models3D/Models3D';
import { Position, Rotation, Scale } from '@/app/utils/Types';
//import { LevelProps } from '@/app/utils/Types';
import { LevelBlockProps } from '@/app/utils/Types';

const degreesToRadians = (degrees: number) => degrees * (Math.PI / 180);




export const LevelBlock = ({ isLeftArrowClicked, levelData, level, isActive, isVisible }: LevelBlockProps) => {
  const numOfElements = levelData.length;

  return (
    <>
      {levelData.map((model, i) => {
        console.log('model.startPosition: ', model.startPosition)
        const startPosition: Position = model.startPosition;
        const targetPosition: Position = model.targetPosition;
        const rotation: Rotation = [degreesToRadians(model.rotation[0]), degreesToRadians(model.rotation[1]), degreesToRadians(model.rotation[2])];
        const scale: Scale = model.scale;

        // ensure level is not undefind
        const levelValue = level ?? "";

        return (
          <group key={model.id} visible={isVisible}>
            <Model
              model={{
                url: model.url,
                name: model.name,
                level: levelValue,
                isActive: isActive,
                startPosition: startPosition ,
                targetPosition: targetPosition ,
                rotation: rotation ,
                scale: scale, //as [number, number, number],
                transitionScale: { duration: 0.4, delay: 0.15 * i, type: 'spring', stiffness: 80 },
                isLeftArrowClicked: isLeftArrowClicked,
                delayIn: (numOfElements - 1 - i) * 1,
                delayOut: !isActive ? i * 0.2 : i * 1,
                color: model.color,
                map: model.map,
              }}
            />
          </group>
        );
      })}
    </>
  );
};