import { useEffect } from "react";
import {
  usePlayerCardStore,
  useEnemyCardStore,
  useBattleStore,
} from "@store/store";

const useArenaCardUpdater = () => {
  const turn = useBattleStore((state) => state.turn);
  const updatePlayerCard = usePlayerCardStore((state) => state.updateArenaCard);
  const updateEnemyCard = useEnemyCardStore((state) => state.updateArenaCard);

  useEffect(() => {
    if (turn?.actor === "player") {
      updateEnemyCard(turn.damage ?? 0);
    } else if (turn?.actor === "enemy") {
      updatePlayerCard(turn.damage ?? 0);
    }
  }, [turn]);
};

export default useArenaCardUpdater;
