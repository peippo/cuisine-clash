import { usePlayerCardStore, useEnemyCardStore } from "@store/store";
import { randomInt } from "@utils/general";

import Card from "@components/Card/CardBase";
import { useEffect } from "react";
import StatusMessages from "./StatusMessages";
import useBattleSolver from "@hooks/useBattleSolver";

const Arena = () => {
  const playerCard = usePlayerCardStore((state) => state.arenaCard);
  const enemyCard = useEnemyCardStore((state) => state.arenaCard);
  const playRandom = useEnemyCardStore((state) => state.playRandom);

  const { refetch } = useBattleSolver();

  useEffect(() => {
    if (playerCard && !enemyCard) {
      setTimeout(() => {
        playRandom();
      }, randomInt(750, 1500));
    }
    if (playerCard && enemyCard) {
      refetch();
    }
  }, [playerCard, enemyCard]);

  return (
    <div className="flex w-full">
      {playerCard && (
        <Card card={playerCard} isDisabled={true} isRevealed={true} />
      )}

      <StatusMessages />

      {enemyCard && (
        <Card card={enemyCard} isDisabled={true} isRevealed={true} />
      )}
    </div>
  );
};

export default Arena;
