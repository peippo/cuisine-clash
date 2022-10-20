import { useState, useEffect } from "react";
import { useBattleStore } from "@store/store";
import type { Turn } from "@customTypes/types";
import classNames from "classnames";

const StatusMessages = () => {
  const turn = useBattleStore((state) => state.turn);

  const [turnHistory, setTurnHistory] = useState<Turn[]>([]);

  useEffect(() => {
    const turns = turnHistory ? [...turnHistory, turn as Turn] : [turn as Turn];

    if (turns.length >= 10) {
      turns.shift();
    }

    setTurnHistory(turns);
  }, [turn]);

  return (
    <div
      className={classNames(
        "relative m-4 flex h-72 w-full flex-col justify-end overflow-hidden rounded-lg bg-gray-900 shadow-lg",
        "after:absolute after:top-0 after:left-0 after:h-32 after:w-full after:bg-gradient-to-b after:from-gray-900"
      )}
    >
      {turnHistory.map(
        (turn) =>
          turn && (
            <p className="border-b border-indigo-900 pr-4" key={turn.round}>
              <span className="mr-2 inline-block w-12 bg-indigo-900 py-1 px-3 text-right text-indigo-300">
                {turn.round}
              </span>{" "}
              {turn.message}
            </p>
          )
      )}
    </div>
  );
};

export default StatusMessages;
