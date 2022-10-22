import { useEffect } from "react";
import { useStore } from "@store/store";
import { randomInt } from "@utils/general";
import useBattleSolver from "@hooks/useBattleSolver";
import useArenaCardUpdater from "@hooks/useArenaCardUpdater";

import Card from "@components/Card/CardBase";
import StatusMessages from "./StatusMessages";

const Arena = () => {
  const playerCard = useStore((state) => state.playerArenaCard);
  const enemyCard = useStore((state) => state.enemyArenaCard);
  const arenaStatus = useStore((state) => state.arenaStatus);
  const playRandomEnemyCard = useStore((state) => state.playRandomEnemyCard);

  const { refetch } = useBattleSolver();
  useArenaCardUpdater();

  useEffect(() => {
    if (arenaStatus === "WAITING_FOR_ENEMY") {
      setTimeout(() => {
        playRandomEnemyCard();
      }, randomInt(750, 1500));
    }
    if (arenaStatus === "BATTLE_ONGOING") {
      refetch();
    }
  }, [arenaStatus]);

  return (
    <div className="flex w-full">
      {playerCard && (
        <Card card={playerCard} isDisabled={true} isRevealed={true} />
      )}

      <StatusMessages />

      {enemyCard && (
        <Card
          card={enemyCard}
          isDisabled={true}
          isRevealed={true}
          isEnemy={true}
        />
      )}
    </div>
  );
};

export default Arena;
