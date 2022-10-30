import { useState, useEffect } from "react";
import { trpc } from "@utils/trpc";
import { useStore } from "@store/store";
import { Dish } from "@prisma/client";
import { TurnData } from "@customTypes/types";

/**
 * Fetches the results of battle between arena cards & updates turn data
 * @returns {function} Function for triggering the battle solver
 */
const useBattleSolver = () => {
  const playerArenaCard = useStore((state) => state.playerArenaCard);
  const enemyArenaCard = useStore((state) => state.enemyArenaCard);
  const updateTurnData = useStore((state) => state.updateTurnData);
  const turnSpeed = useStore((state) => state.turnSpeed);

  const [turnsQueue, setTurnsQueue] = useState<TurnData[] | undefined>(
    undefined
  );

  const { data: turns, refetch: solveBattle } = trpc.battle.solve.useQuery(
    {
      playerCard: playerArenaCard as Dish,
      enemyCard: enemyArenaCard as Dish,
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
    }, turnSpeed);

    if (turnsQueue.length === 0) clearInterval(interval);

    return () => clearInterval(interval);
  }, [turnsQueue, turnSpeed]);

  return { solveBattle };
};

export default useBattleSolver;
