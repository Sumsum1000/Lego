import { create } from 'zustand';

interface LevelStore {
  currentLevel: number;
  setCurrentLevel: (level: number) => void;
  setNextLevel: () => void; // This doesn't need to take a level argument if it's just incrementing
  setPreviousLevel: () => void;
}

type ClickStore = {
    isLeftButton: boolean;
    setRightClick: () => void;
    setLeftClick: () => void;
    //setNoneClick: () => void;
}

type DirectionFlowStore = {
  directionFlow: 'forward' | 'backward';
  setDirectionFlow: (state: 'forward' | 'backward') => void;
}

export const useLevelStore = create<LevelStore>((set) => ({
  currentLevel: 1,
  setCurrentLevel: (level: number) => set(() => ({ currentLevel: level })),
  setNextLevel: () => set((state) => ({ currentLevel: state.currentLevel + 1 })), // Correctly updates currentLevel
  setPreviousLevel: () => set((state) => ({ currentLevel: state.currentLevel - 1 })), // Correctly updates currentLevel
}));

// export const useClickStore = create<ClickStore>((set) => ({
//     currentClick: true,
//     setRightClick: () => set({ currentClick: false }),
//     setLeftClick: () => set({ currentClick: true }),
//     //setNoneClick: () => set(() => ({ currentClick: 'none' })),
// }))

export const useClickStore = create<ClickStore>((set) => ({
  isLeftButton: true,
  setRightClick: () => set({ isLeftButton: false }),
  setLeftClick: () => set({ isLeftButton: true }),
}))

export const useDirectionFlowStore = create<DirectionFlowStore>((set) => ({
  directionFlow: 'forward',
  setDirectionFlow: (state: 'forward' | 'backward') => set({ directionFlow: state }),
}));

 //const [isLeftArrowClicked_, setIsLeftArrowClicked_] = useState(true);


