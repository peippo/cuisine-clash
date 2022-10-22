import { useEffect } from "react";
import { useStore } from "@store/store";
import { randomInt } from "@utils/general";
import useBattleSolver from "@hooks/useBattleSolver";
import useArenaCardUpdater from "@hooks/useArenaCardUpdater";

import Card from "@components/Card/CardBase";
import TurnMessages from "./TurnMessages";
import StatusMessages from "./StatusMessages";
import CardArea from "./CardArea";

const Arena = () => {
  const playerCard = useStore((state) => state.playerArenaCard);
  const enemyCard = useStore((state) => state.enemyArenaCard);
  const arenaStatus = useStore((state) => state.arenaStatus);
  const playRandomEnemyCard = useStore((state) => state.playRandomEnemyCard);

  const { refetch } = useBattleSolver();
  useArenaCardUpdater();

  const isWaitingCard =
    arenaStatus === "WAITING_FOR_PLAYER" || arenaStatus === "WAITING_FOR_ENEMY";

  useEffect(() => {
    if (arenaStatus === "WAITING_FOR_ENEMY") {
      setTimeout(() => {
        playRandomEnemyCard();
      }, randomInt(1000, 2000));
    }
    if (arenaStatus === "BATTLE_ONGOING") {
      refetch();
    }
  }, [arenaStatus]);

  return (
    <div className="flex w-full">
      <CardArea actor="player">
        {playerCard && (
          <Card card={playerCard} isDisabled={true} isRevealed={true} />
        )}
      </CardArea>

      {isWaitingCard && <StatusMessages />}
      {arenaStatus === "BATTLE_ONGOING" && <TurnMessages />}

      <CardArea actor="enemy">
        {enemyCard && (
          <Card
            card={enemyCard}
            isDisabled={true}
            isRevealed={true}
            isEnemy={true}
          />
        )}
      </CardArea>
    </div>
  );
};

export default Arena;
