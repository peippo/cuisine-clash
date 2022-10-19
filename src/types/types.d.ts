type Battlers = "player" | "enemy";

export interface Turn {
  round: number;
  actor: Battlers;
  damage: number;
  message: string;
  winner: Battlers | undefined;
}
