import { create } from "zustand";

type HeartsModalState = {
  isOpen: boolean;
  open: () => void;
  openBroken: () => void;
  close: () => void;
};

export const useHeartsModal = create<HeartsModalState>((set) => ({
  isOpen: false,
  open: () => set({ isOpen: true }),
  openBroken: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
}));

// Hearts regeneration store - tracks last regen time
type HeartsRegenState = {
  lastRegenTime: number | null;
  setLastRegenTime: (time: number) => void;
};

export const useHeartsRegen = create<HeartsRegenState>((set) => ({
  lastRegenTime: null,
  setLastRegenTime: (time: number) => set({ lastRegenTime: time }),
}));
