import create from "zustand";
import { Dish } from "@prisma/client";
import {
  Views,
  ArenaStatus,
  TurnData,
  Battlers,
  TurnSpeed,
} from "@customTypes/types";

import {
  MAX_DRAFT_CARDS,
  MAX_HAND_CARDS,
  DRAFTING_REDRAWS,
} from "@utils/constants";
import { getRandomBetween } from "@utils/general";
import { getCardRarity } from "@utils/cards";

type StoreState = {
  turnSpeed: TurnSpeed;
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
  roundWinner: Battlers | undefined;
  startingSide: Battlers | undefined;
};

type StoreActions = {
  setTurnSpeed: (speed: TurnSpeed) => void;
  moveToView: (view: Views) => void;
  resetGame: () => void;
  resetDrafting: () => void;
  setStartingSide: (battler: Battlers) => void;
  redraw: () => void;
  setTableCards: (card: Array<Dish>) => void;
  addToPlayerHand: (card: Dish) => void;
  clearPlayerHand: () => void;
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
  startingSide: undefined,
  roundWinner: undefined,
  turnSpeed: 600,

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
  arenaStatus: "IDLE",
  turnData: undefined,

  // Game actions
  setTurnSpeed: (speed) => set(() => ({ turnSpeed: speed })),
  moveToView: (view) => set(() => ({ view: view })),
  resetGame: () =>
    set(() => ({
      isPlayerHandFull: false,
      startingSide: undefined,
      playerCards: [],
      enemyCards: [],
      tableCards: [],
    })),
  resetDrafting: () =>
    set(() => ({
      countToFetch: MAX_DRAFT_CARDS,
      redrawsLeft: DRAFTING_REDRAWS,
      selectedCardIds: [],
    })),
  setStartingSide: (battler) => set(() => ({ startingSide: battler })),
  updateTurnData: (turnData) => set(() => ({ turnData: turnData })),
  updateArenaStatus: (status) => set(() => ({ arenaStatus: status })),
  clearTurn: () => {
    const turnWinner = get().turnData?.winner;

    if (turnWinner === "player") {
      get().returnPlayerArenaCard();
    } else {
      get().returnEnemyArenaCard();
    }

    const isRoundFinished =
      get().playerCards.length === 0 || get().enemyCards.length === 0;

    if (get().playerCards.length === 0) {
      set(() => ({ roundWinner: "enemy", arenaStatus: "BATTLE_FINISHED" }));
    } else if (get().enemyCards.length === 0) {
      set(() => ({ roundWinner: "player", arenaStatus: "BATTLE_FINISHED" }));
    } else {
      set(() => ({
        arenaStatus:
          turnWinner === "player" ? "WAITING_FOR_PLAYER" : "WAITING_FOR_ENEMY",
      }));
    }

    set(() => ({
      turnData: undefined,
      playerArenaCard: null,
      enemyArenaCard: null,
    }));

    if (isRoundFinished) {
      get().resetGame();
    }
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
    const rarity = getCardRarity(card);
    card.rarity = rarity;

    set((state) => ({
      playerCards: [...state.playerCards, card],
    }));
    set((state) => ({
      isPlayerHandFull: state.playerCards.length === MAX_HAND_CARDS,
    }));
  },
  clearPlayerHand: () => set(() => ({ playerCards: [] })),
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
    const randomCard = get().enemyCards[getRandomBetween(0, max)] as Dish;

    set((state) => ({
      enemyArenaCard: randomCard,
      enemyCards: state.enemyCards.filter((card) => card.id !== randomCard.id),
      arenaStatus: state.playerArenaCard
        ? "BATTLE_ONGOING"
        : "WAITING_FOR_PLAYER",
    }));
  },
  addCardsToEnemy: (cards) => {
    const ratedCards = cards.map((card) => {
      card.rarity = getCardRarity(card);

      return card;
    });

    set(() => ({ enemyCards: ratedCards }));
  },
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
