import { Dish } from "@prisma/client";
import {
  MAX_DRAFT_CARDS,
  MAX_HAND_CARDS,
  DRAFTING_REDRAWS,
} from "@utils/constants";
import create from "zustand";

// Game state

type views = "TITLE" | "DRAFTING" | "BATTLE";

interface GameState {
  view: views;
  moveTo: (view: views) => void;
}

export const useGameStore = create<GameState>()((set) => ({
  view: "TITLE",
  moveTo: (view) => set(() => ({ view: view })),
}));

// Cards in hand

interface HandState {
  cards: Array<Dish>;
  isHandFull: boolean;
  add: (card: Dish) => void;
  remove: (id: number) => void;
  clear: () => void;
}

export const useHandStore = create<HandState>()((set) => ({
  cards: [],
  isHandFull: false,
  add: (card) => {
    set((state) => ({ cards: [...state.cards, card] }));
    set((state) => ({ isHandFull: state.cards.length === MAX_HAND_CARDS }));
  },
  remove: (id) =>
    set((state) => ({ cards: state.cards.filter((card) => card.id !== id) })),
  clear: () => set({ cards: [] }),
}));

// Drafting phase

interface DraftingState {
  countToFetch: number;
  selectedCardIds: Array<number>;
  tableCards: Array<Dish>;
  redrawsLeft: number;
  setTableCards: (card: Array<Dish>) => void;
  redraw: (refetcher: () => void) => void;
}

export const useDraftingStore = create<DraftingState>()((set) => ({
  countToFetch: MAX_DRAFT_CARDS,
  redrawsLeft: DRAFTING_REDRAWS,
  selectedCardIds: [],
  tableCards: [],
  setTableCards: (cards) => set(() => ({ tableCards: cards })),
  redraw: (refetcher: () => void) => {
    refetcher();
    set((state) => ({ redrawsLeft: state.redrawsLeft - 1 }));
    set(() => ({
      countToFetch: MAX_DRAFT_CARDS - useHandStore.getState().cards.length,
    }));
    set(() => ({
      selectedCardIds: useHandStore.getState().cards.map((card) => card.id),
    }));
  },
}));
