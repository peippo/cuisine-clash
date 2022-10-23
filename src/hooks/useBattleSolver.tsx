import { useEffect } from "react";
import { trpc } from "@utils/trpc";
import { useStore } from "@store/store";
import { Dish } from "@prisma/client";

const useBattleSolver = () => {
  const playerArenaCard = useStore((state) => state.playerArenaCard);
  const enemyArenaCard = useStore((state) => state.enemyArenaCard);
  const updateTurnData = useStore((state) => state.updateTurnData);

  const { data: turns, refetch } = trpc.battle.solve.useQuery(
    {
      playerCard: playerArenaCard as Dish,
      enemyCard: enemyArenaCard as Dish,
    },
    {
      enabled: false,
    }
  );

  useEffect(() => {
    const interval = setInterval(() => {
      if (turns && turns[0]) {
        updateTurnData(turns?.shift());
      }
    }, 500);

    return () => clearInterval(interval);
  }, [turns]);

  return { refetch };
};

export default useBattleSolver;
