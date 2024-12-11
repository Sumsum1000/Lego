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
// Correctly updates currentLevel
  setNextLevel: () => set((state) => ({
    level: { 
      ...state.level,
      currentLevel: state.level.currentLevel + 1, 
      tempLevel: state.level.currentLevel,
    }
  })), // Correctly updates currentLevel
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
  canClick: false,
  isStartButton: false,
  setRightClick: () => set({ isLeftButton: true }),
  setLeftClick: () => set({ isLeftButton: false }),
  setCanClick: (state) => set({canClick: state}),
  setIsStartButton: (state) => set({isStartButton: state})
}))





