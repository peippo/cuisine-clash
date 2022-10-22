export type Views = "TITLE" | "DRAFTING" | "BATTLE";

export type ArenaStatus =
  | "WAITING_FOR_PLAYER"
  | "BATTLE_ONGOING"
  | "WAITING_FOR_ENEMY"
  | "BATTLE_FINISHED";

type Battlers = "player" | "enemy";

export type TurnData = {
  round: number;
  actor: Battlers;
  damage: number;
  message: string;
  winner: Battlers | undefined;
};
