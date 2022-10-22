import { useState, useEffect } from "react";
import { useStore } from "@store/store";
import classNames from "classnames";
import type { TurnData } from "@customTypes/types";

const StatusMessages = () => {
  const currentTurnData = useStore((state) => state.turnData);

  const [turnHistory, setTurnHistory] = useState<TurnData[]>([]);

  useEffect(() => {
    const turns = turnHistory
      ? [...turnHistory, currentTurnData as TurnData]
      : [currentTurnData as TurnData];

    if (turns.length >= 10) {
      turns.shift();
    }

    setTurnHistory(turns);
  }, [currentTurnData]);

  return (
    <div
      className={classNames(
        "relative m-4 flex h-72 w-full flex-col justify-end overflow-hidden rounded-lg bg-gray-900",
        "after:absolute after:top-0 after:left-0 after:h-32 after:w-full after:bg-gradient-to-b after:from-gray-900"
      )}
    >
      {turnHistory.map(
        (turn) =>
          turn && (
            <p
              className={classNames(
                "border-b border-indigo-900 pr-4",
                turn.winner && "text-red-500"
              )}
              key={turn.round}
            >
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
