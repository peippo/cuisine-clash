import { Dish } from "@prisma/client";
import create from "zustand";

interface HandState {
  cards: Array<Dish>;
  add: (card: Dish) => void;
  remove: (id: number) => void;
  clear: () => void;
}

export const useHandStore = create<HandState>()((set) => ({
  cards: [],
  add: (card) => set((state) => ({ cards: [...state.cards, card] })),
  remove: (id) =>
    set((state) => ({ cards: state.cards.filter((card) => card.id !== id) })),
  clear: () => set({ cards: [] }),
}));
