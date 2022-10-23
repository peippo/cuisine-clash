import { useState, useEffect } from "react";
import { trpc } from "@utils/trpc";
import { useStore } from "@store/store";
import { Dish } from "@prisma/client";
import { Battlers, TurnData } from "@customTypes/types";

const useBattleSolver = (startingSide: Battlers) => {
  const playerArenaCard = useStore((state) => state.playerArenaCard);
  const enemyArenaCard = useStore((state) => state.enemyArenaCard);
  const updateTurnData = useStore((state) => state.updateTurnData);

  const [turnsQueue, setTurnsQueue] = useState<TurnData[] | undefined>(
    undefined
  );

  const { data: turns, refetch } = trpc.battle.solve.useQuery(
    {
      playerCard: playerArenaCard as Dish,
      enemyCard: enemyArenaCard as Dish,
      startingSide: startingSide,
    },
    {
      enabled: false,
    }
  );

  useEffect(() => {
    if (!turns) return;

    setTurnsQueue(turns);
  }, [turns]);

  useEffect(() => {
    if (turnsQueue === undefined) return;

    const interval = setInterval(() => {
      if (turnsQueue && turnsQueue[0]) {
        const nextTurnData = turnsQueue[0];
        setTurnsQueue(turnsQueue.slice(1));
        updateTurnData(nextTurnData);
      }
    }, 500);

    if (turnsQueue.length === 0) clearInterval(interval);

    return () => clearInterval(interval);
  }, [turnsQueue]);

  return { refetch };
};

export default useBattleSolver;
