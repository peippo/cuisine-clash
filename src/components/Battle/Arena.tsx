import {
  usePlayerCardStore,
  useEnemyCardStore,
  useBattleStore,
} from "@store/store";
import { randomInt } from "@utils/general";

import Card from "@components/Card/CardBase";
import { useEffect } from "react";
import StatusMessages from "./StatusMessages";
import useBattleSolver from "@hooks/useBattleSolver";
import useArenaCardUpdater from "@hooks/useArenaCardUpdater";

const Arena = () => {
  const playerCard = usePlayerCardStore((state) => state.arenaCard);
  const enemyCard = useEnemyCardStore((state) => state.arenaCard);
  const playRandom = useEnemyCardStore((state) => state.playRandom);
  const arenaStatus = useBattleStore((state) => state.arenaStatus);

  const { refetch } = useBattleSolver();
  useArenaCardUpdater();

  useEffect(() => {
    if (arenaStatus === "waitingForEnemy") {
      setTimeout(() => {
        playRandom();
      }, randomInt(750, 1500));
    }
    if (arenaStatus === "combat") {
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
