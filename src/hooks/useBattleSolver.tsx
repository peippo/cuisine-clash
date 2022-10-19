import { useEffect } from "react";
import { trpc } from "@utils/trpc";
import {
  usePlayerCardStore,
  useEnemyCardStore,
  useBattleStore,
} from "@store/store";

const useBattleSolver = () => {
  const playerCard = usePlayerCardStore((state) => state.arenaCard);
  const enemyCard = useEnemyCardStore((state) => state.arenaCard);
  const updateTurn = useBattleStore((state) => state.updateTurn);

  const { data: turns, refetch } = trpc.battle.solve.useQuery(
    {
      playerId: playerCard?.id as number,
      enemyId: enemyCard?.id as number,
    },
    {
      enabled: false,
    }
  );

  useEffect(() => {
    const interval = setInterval(() => {
      if (turns && turns[0]) {
        updateTurn(turns?.shift());
      }
    }, 500);

    return () => clearInterval(interval);
  }, [turns]);

  return { refetch };
};

export default useBattleSolver;
