import { ICard } from '@/types';
import { create } from 'zustand';

interface TestStore {
  cards: ICard[];
  setCards: (cards: ICard[]) => void;
  currentCard: number;
  setCurrentCard: (currentCard: number) => void;
  testLength: number;
  setTestLength: (testLength: number) => void;
  known: number;
  setKnown: (known: number) => void;
  unknown: number;
  setUnknown: (unknown: number) => void;
  testIsStarted: boolean;
  setTestIsStarted: (testIsStarted: boolean) => void;
}

const useTestStore = create<TestStore>()((set) => ({
  cards: [],
  setCards: (cards: ICard[]) => set({ cards }),
  currentCard: 0,
  setCurrentCard: (currentCard: number) => set({ currentCard }),
  testLength: 0,
  setTestLength: (testLength: number) => set({ testLength }),
  known: 0,
  setKnown: (known: number) => set({ known }),
  unknown: 0,
  setUnknown: (unknown: number) => set({ unknown }),
  testIsStarted: false,
  setTestIsStarted: (testIsStarted: boolean) => set({ testIsStarted }),
}));

export default useTestStore;
