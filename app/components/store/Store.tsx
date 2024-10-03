import { create } from 'zustand';

interface LevelStore {
  currentLevel: number;
  setCurrentLevel: (level: number) => void;
  setNextLevel: () => void; // This doesn't need to take a level argument if it's just incrementing
  setPreviousLevel: () => void
}

const useLevelStore = create<LevelStore>((set) => ({
  currentLevel: 0,
  setCurrentLevel: (level: number) => set(() => ({ currentLevel: level })),
  setNextLevel: () => set((state) => ({ currentLevel: state.currentLevel + 1 })), // Correctly updates currentLevel
  setPreviousLevel: () => set((state) => ({ currentLevel: state.currentLevel - 1 })), // Correctly updates currentLevel
}));

export default useLevelStore;