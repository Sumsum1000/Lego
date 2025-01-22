import { Controls } from 'three';
import { create } from 'zustand';

interface LevelStore {
  level: {currentLevel: number, tempLevel: number, modelLevel: number, isEndAnimation: boolean};
  setCurrentLevel: (level: number) => void;
  setNextLevel: () => void; 
  setPreviousLevel: () => void;
  setAnimationStatus: (status: boolean) => void;
  //setModelLevel: (level: number) => void;
}

type ClickStore = {
  isLeftButton: boolean;
  canClick: boolean,
  isStartButton: boolean;
  setRightClick: () => void;
  setLeftClick: () => void;
  setCanClick: (state: boolean) => void;
  setIsStartButton: (state: boolean) => void;
}

export const useLevelStore = create<LevelStore>((set) => ({
  level: { currentLevel: 1, tempLevel: 1, modelLevel: 1, isEndAnimation: false },
  setNextLevel: () => set((state) => ({
    level: { 
      ...state.level,
      currentLevel: state.level.currentLevel + 1, 
      tempLevel: state.level.currentLevel,
    }
  })),
  setPreviousLevel: () => set((state) => ({
    level: { 
      ...state.level,
      currentLevel: state.level.currentLevel - 1, 
      tempLevel: state.level.currentLevel,
    }
  })), // Correctly updates currentLevel
  setCurrentLevel: (newLevel: number) => set((state) => ({
    level: { 
      ...state.level,
      currentLevel: newLevel, 
      tempLevel: state.level.tempLevel ,
    }
  })),
  setAnimationStatus: (status: boolean) => set((state) => ({
    level:{
      ...state.level, status
    }
  })),
  setModelLevel: (modelLevel: number) => set((state) => ({
    level:{
      ...state.level, modelLevel
    }
  }))
}));

export const useClickStore = create<ClickStore>((set) => ({
  isLeftButton: true,
  canClick: true,
  isStartButton: false,
  setRightClick: () => set({ isLeftButton: true }),
  setLeftClick: () => set({ isLeftButton: false }),
  setCanClick: (state) => set({canClick: state}),
  setIsStartButton: (state) => set({isStartButton: state})
}))

type SoundStoreType = {
  sound: {
    isSoundPlaying: boolean;
    src: string;
    volume: number;
    setToggleSound: () => void;
    setPlayingStart: (startPlay: boolean) => void;
  }
}

export const useSoundStore = create<SoundStoreType>((set) => ({
  sound:{
    isSoundPlaying: false,
    src: '/LegoSoundtrek.mp3',
    volume: 0.2,
    setToggleSound: () => set((state) => ({
      sound: {
        ...state.sound,
        isSoundPlaying: !state.sound.isSoundPlaying,
      }
    })),
    setPlayingStart: (startPlay) => set((state) => ({
      sound: {
        ...state.sound,
        isSoundPlaying: startPlay
      }
    })),
  }
}));





