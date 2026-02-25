// stores/usePositionStore.ts
import { create } from 'zustand';
import type { Position } from '../../types/stock.types';
import { MockPositions } from '../../data/sampleData';

interface PositionStore {
  // State
  positions: Position[];
  compareList: Position[];

  // Actions
  toggleCompare: (item: Position) => void;
  clearCompare: () => void;
  isInCompare: (symbol: string) => boolean;
}

export const usePositionStore = create<PositionStore>((set, get) => ({
  // --- Initial State ---
  positions: MockPositions,
  compareList: [],

  // --- Actions ---

  // Toggle: Adds if missing, removes if present (Max 4)
  toggleCompare: (item) => {
    const { compareList } = get();
    const isAlreadyIn = compareList.some((p) => p.symbol === item.symbol);

    if (isAlreadyIn) {
      // Remove using symbol
      set({
        compareList: compareList.filter((p) => p.symbol !== item.symbol),
      });
    } else {
      // Check limit before adding
      if (compareList.length >= 4) {
        alert('You can only compare up to 4 positions.');
        return;
      }
      // Add to list
      set({ compareList: [...compareList, item] });
    }
  },

  // Clear the whole comparison tray
  clearCompare: () => set({ compareList: [] }),

  // Helper for UI styling (e.g., changing button color)
  isInCompare: (symbol) => {
    return get().compareList.some((p) => p.symbol === symbol);
  },
}));