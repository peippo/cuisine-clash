import { useEffect } from "react";
import { useStore } from "@store/store";

const useArenaCardUpdater = () => {
  const turnData = useStore((state) => state.turnData);
  const updatePlayerCard = useStore((state) => state.updatePlayerArenaCard);
  const updateEnemyCard = useStore((state) => state.updateEnemyArenaCard);

  useEffect(() => {
    if (turnData?.actor === "player") {
      updateEnemyCard(turnData.damage ?? 0);
    } else if (turnData?.actor === "enemy") {
      updatePlayerCard(turnData.damage ?? 0);
    }
  }, [turnData]);
};

export default useArenaCardUpdater;
