import { create } from 'zustand';

interface LevelStore {
  currentLevel: number;
  setCurrentLevel: (level: number) => void;
  setNextLevel: () => void; // This doesn't need to take a level argument if it's just incrementing
  setPreviousLevel: () => void;
}

type ClickStore = {
    currentClick: 'leftClick' | 'none' | 'rightClick';
    setRightClick: () => void;
    setLeftClick: () => void;
    setNoneClick: () => void;
}

export const useLevelStore = create<LevelStore>((set) => ({
  currentLevel: 1,
  setCurrentLevel: (level: number) => set(() => ({ currentLevel: level })),
  setNextLevel: () => set((state) => ({ currentLevel: state.currentLevel + 1 })), // Correctly updates currentLevel
  setPreviousLevel: () => set((state) => ({ currentLevel: state.currentLevel - 1 })), // Correctly updates currentLevel
}));

export const useClickStore = create<ClickStore>((set) => ({
    currentClick: 'none',
    setRightClick: () => set(() => ({ currentClick: 'rightClick' })),
    setLeftClick: () => set(() => ({ currentClick: 'leftClick' })),
    setNoneClick: () => set(() => ({ currentClick: 'none' })),
}))
