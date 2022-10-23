import create from "zustand";
import { Dish } from "@prisma/client";
import { Views, ArenaStatus, TurnData } from "@customTypes/types";

import {
  MAX_DRAFT_CARDS,
  MAX_HAND_CARDS,
  DRAFTING_REDRAWS,
} from "@utils/constants";
import { randomInt } from "@utils/general";

type StoreState = {
  view: Views;
  countToFetch: number;
  redrawsLeft: number;
  selectedCardIds: Array<number>;
  tableCards: Array<Dish>;
  playerCards: Array<Dish>;
  enemyCards: Array<Dish>;
  isPlayerHandFull: boolean;
  playerArenaCard: Dish | null;
  enemyArenaCard: Dish | null;
  arenaStatus: ArenaStatus;
  turnData: TurnData | undefined;
};

type StoreActions = {
  moveToView: (view: Views) => void;
  redraw: () => void;
  setTableCards: (card: Array<Dish>) => void;
  addToPlayerHand: (card: Dish) => void;
  playCard: (card: Dish) => void;
  addCardsToEnemy: (cards: Array<Dish>) => void;
  playRandomEnemyCard: () => void;
  updatePlayerArenaCard: (damage: number) => void;
  updateEnemyArenaCard: (damage: number) => void;
  returnPlayerArenaCard: () => void;
  returnEnemyArenaCard: () => void;
  updateTurnData: (turnData: TurnData | undefined) => void;
  updateArenaStatus: (status: ArenaStatus) => void;
  clearTurn: () => void;
};

export const useStore = create<StoreState & StoreActions>((set, get) => ({
  // Game state
  view: "TITLE",

  // Drafting state
  countToFetch: MAX_DRAFT_CARDS,
  redrawsLeft: DRAFTING_REDRAWS,
  selectedCardIds: [],
  tableCards: [],

  // Cards state
  playerCards: [],
  playerArenaCard: null,
  isPlayerHandFull: false,
  enemyCards: [],
  enemyArenaCard: null,

  // Arena state
  arenaStatus: "WAITING_FOR_PLAYER",
  turnData: undefined,

  // Game actions
  moveToView: (view) => set(() => ({ view: view })),
  updateTurnData: (turnData) => set(() => ({ turnData: turnData })),
  updateArenaStatus: (status) => set(() => ({ arenaStatus: status })),
  clearTurn: () => {
    const turnWinner = get().turnData?.winner;

    if (turnWinner === "player") {
      get().returnPlayerArenaCard();
    } else {
      get().returnEnemyArenaCard();
    }

    set(() => ({
      arenaStatus:
        turnWinner === "player" ? "WAITING_FOR_PLAYER" : "WAITING_FOR_ENEMY",
      turnData: undefined,
      playerArenaCard: null,
      enemyArenaCard: null,
    }));
  },

  // Drafting actions
  redraw: () => {
    set((state) => ({
      redrawsLeft: state.redrawsLeft - 1,
      countToFetch: MAX_DRAFT_CARDS - state.playerCards.length,
      selectedCardIds: state.playerCards.map((card) => card.id),
    }));
  },
  setTableCards: (cards) => set(() => ({ tableCards: cards })),

  // Player cards actions
  addToPlayerHand: (card) => {
    set((state) => ({
      playerCards: [...state.playerCards, card],
    }));
    set((state) => ({
      isPlayerHandFull: state.playerCards.length === MAX_HAND_CARDS,
    }));
  },
  playCard: (selectedCard) => {
    set((state) => ({
      playerArenaCard: selectedCard,
      playerCards: state.playerCards.filter(
        (card) => card.id !== selectedCard.id
      ),
      arenaStatus: state.enemyArenaCard
        ? "BATTLE_ONGOING"
        : "WAITING_FOR_ENEMY",
    }));
  },
  returnPlayerArenaCard: () =>
    set((state) => ({
      playerCards: [...state.playerCards, state.playerArenaCard as Dish],
    })),
  updatePlayerArenaCard: (damage) => {
    set((state) => ({
      playerArenaCard: state.playerArenaCard
        ? {
            ...state.playerArenaCard,
            energy: Math.max(0, state.playerArenaCard.energy - damage),
          }
        : null,
    }));
  },

  // Enemy cards actions
  playRandomEnemyCard: () => {
    const max = get().enemyCards.length - 1;
    const randomCard = get().enemyCards[randomInt(0, max)] as Dish;

    set((state) => ({
      enemyArenaCard: randomCard,
      enemyCards: state.enemyCards.filter((card) => card.id !== randomCard.id),
      arenaStatus: state.playerArenaCard
        ? "BATTLE_ONGOING"
        : "WAITING_FOR_PLAYER",
    }));
  },
  addCardsToEnemy: (cards) => set(() => ({ enemyCards: cards })),
  returnEnemyArenaCard: () =>
    set((state) => ({
      enemyCards: [...state.enemyCards, state.enemyArenaCard as Dish],
    })),
  updateEnemyArenaCard: (damage) => {
    set((state) => ({
      enemyArenaCard: state.enemyArenaCard
        ? {
            ...state.enemyArenaCard,
            energy: Math.max(0, state.enemyArenaCard.energy - damage),
          }
        : null,
    }));
  },
}));
