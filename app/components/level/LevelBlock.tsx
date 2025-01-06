
import { Model } from '../models3D/Models3D';
import { Position, Rotation, Scale  } from '../../utils/Types';
import { LevelBlockProps } from '../../utils/Types';

const degreesToRadians = (degrees: number) => degrees * (Math.PI / 180);

export const LevelBlock = ({ isForwardAnim, levelData, level_, isActive, isVisible }: LevelBlockProps) => {
  const numOfElements = levelData.length;

  return (
    <>
      {levelData.map((model, i) => {
        const startPosition: Position = model.startPosition;
        const targetPosition: Position = model.targetPosition;
        const rotation: Rotation = [degreesToRadians(model.rotation[0]), degreesToRadians(model.rotation[1]), degreesToRadians(model.rotation[2])];
        const scale: Scale = model.scale;

        // ensure level is not undefind
        const levelValue = level_ ?? "";

        const lastIndex = levelData.length - 1

        return (
          <group key={model.id} visible={typeof isVisible === 'function' ? isVisible() : isVisible} >
            <Model
              model={{
                url: model.url,
                name: model.name,
                level: level_,
                isActive: isActive,
                startPosition: startPosition ,
                targetPosition: targetPosition ,
                rotation: rotation ,
                scale: scale, 
                transitionScale: { duration: 0.4, delay: 0.15 * i, type: 'spring', stiffness: 80 },
                isForwardAnim: isForwardAnim,
                delayIn: (numOfElements - 1 - i) * 1,
                delayOut: !isActive ? i * 0.2 : i * 1,
                color: model.color,
                map: model.map,
                onAnimationComplete: () => {
                  if(i === lastIndex && !isForwardAnim){
                    console.log('End animation')
                  }
                }
              }}
            />
          </group>
        );
      })}
    </>
  );
};