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
