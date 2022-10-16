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

//////////////
// Drafting //
//////////////

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
      countToFetch:
        MAX_DRAFT_CARDS - usePlayerCardStore.getState().cards.length,
    }));
    set(() => ({
      selectedCardIds: usePlayerCardStore
        .getState()
        .cards.map((card) => card.id),
    }));
  },
}));

///////////
// Cards //
///////////

interface CardState {
  cards: Array<Dish>;
  arenaCard: Dish | null;
  remove: (id: number) => void;
  play: (card: Dish) => void;
}

interface PlayerCardExtrasState {
  isHandFull: boolean;
  add: (card: Dish) => void;
}

type PlayerCardState = CardState & PlayerCardExtrasState;

export const usePlayerCardStore = create<PlayerCardState>()((set) => ({
  cards: [],
  arenaCard: null,
  isHandFull: false,
  add: (card) => {
    set((state) => ({ cards: [...state.cards, card] }));
    set((state) => ({ isHandFull: state.cards.length === MAX_HAND_CARDS }));
  },
  remove: (id) =>
    set((state) => ({ cards: state.cards.filter((card) => card.id !== id) })),
  play: (selectedCard) => {
    set(() => ({ arenaCard: selectedCard }));
    set((state) => ({
      cards: state.cards.filter((card) => card.id !== selectedCard.id),
    }));
  },
}));

interface EnemyCardExtrasState {
  addCards: (cards: Array<Dish>) => void;
}

type EnemyCardState = CardState & EnemyCardExtrasState;

export const useEnemyCardStore = create<EnemyCardState>()((set) => ({
  cards: [],
  arenaCard: null,
  remove: (id) =>
    set((state) => ({ cards: state.cards.filter((card) => card.id !== id) })),
  play: (selectedCard) => {
    set(() => ({ arenaCard: selectedCard }));
    set((state) => ({
      cards: state.cards.filter((card) => card.id !== selectedCard.id),
    }));
  },
  addCards: (cards) => set(() => ({ cards: cards })),
}));
