import { ThreeEvent } from '@react-three/fiber';
import { MeshStandardMaterial } from 'three';

export type Vector3Type = [number, number, number];

export type Position = Vector3Type;
export type Rotation = Vector3Type;
export type Scale = Vector3Type;

export type Transition = {
  duration: number;
  delay: number;
  type?: string;
  stiffness?: number;
};

export type MaterialProps = {
  map?: string;
  color?: string;
};

export type EventHandlers = {
  onClick?: () => void;
  onPointerEnter?: () => void;
  onPointerLeave?: () => void;
  onPointerOver?: (event: ThreeEvent<PointerEvent>) => void;
  onPointerOut?: (event: ThreeEvent<PointerEvent>) => void;
};

export type MaterialType = {
  color: string;
  map?: string;
  roughness: number;
  metalness: number;
};

export type ModelProps = {
  model: {
    url: string;
    name: string;
    level: number;
    isActive: boolean;
    startPosition: Position;
    targetPosition: Position;
    rotation: Rotation;
    scale: Scale;
    transitionScale: Transition;
    isForwardAnim: boolean;
    delayIn: number;
    delayOut: number;
    color?: string;
    map?: string;
    material?: MeshStandardMaterial;
    shouldReset?: boolean;
    onAnimationComplete: () => void;
  };
} & EventHandlers &
  MaterialProps;

export type LightType = {
  position: Vector3Type;
  intensity: number;
};

const defaultLvevel = '';

export type LevelData = {
  levelData: {
    id: string;
    url: string;
    name: string;
    rotation: Vector3Type;
    scale: Vector3Type;
    startPosition: Vector3Type;
    targetPosition: Vector3Type;
    centerPosition: Vector3Type;
    castShadow: boolean;
    receiveShadow: boolean;
    color: string;
    map: string;
  }[];
};

export type LevelBlockProps = {
  isForwardAnim: boolean;
  level_: number;
  isActive: boolean;
  isVisible: boolean | (() => boolean) | undefined;
  startPosition?: Vector3Type;
} & LevelData;

export type LevelProps = {
  level?: string;
  startPosition?: Vector3Type;
};

export type PaginationPropsType = {
  currentPage: number;
  totalPages: number;
  drag: boolean;
  onPageChange: (page: number) => void;
  nextPage: () => void;
  previousPage: () => void;
};

export type BulletType = {
  position: [number, number, number];
};

export type ButtonState = {
  isClicked: boolean;
  className: string;
};

export type DeshboardType = {
  btnTitle: string;
  isClicked: boolean;
  onClick: () => void;
  duration?: number;
  onAnimationComplete?: () => void;
};

export type DeshboardBtnType = {
  onClickHandlers: (() => void)[];
};


