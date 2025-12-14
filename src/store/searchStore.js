// src/store/searchStore.js

import { create } from 'zustand';

export const useSearchStore = create((set) => ({
  // 1. State: The boolean flag to control visibility
  isSearchVisible: false,

  // 2. Action: Function to toggle the state
  toggleSearch: () =>
    set((state) => ({ isSearchVisible: !state.isSearchVisible })),

  // 3. Optional: Function to explicitly hide the search (e.g., when a user submits a search or presses a 'Close' button)
  hideSearch: () => set({ isSearchVisible: false }),

  // 4. Optional: Function to explicitly show the search
  showSearch: () => set({ isSearchVisible: true }),
}));