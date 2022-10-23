import { useState, useEffect } from "react";
import { useStore } from "@store/store";
import classNames from "classnames";
import type { TurnData } from "@customTypes/types";

const TurnMessages = () => {
  const currentTurnData = useStore((state) => state.turnData);
  const clearTurn = useStore((state) => state.clearTurn);

  console.log(currentTurnData);

  const [turnHistory, setTurnHistory] = useState<TurnData[]>([]);

  useEffect(() => {
    const turns = turnHistory
      ? [...turnHistory, currentTurnData as TurnData]
      : [currentTurnData as TurnData];

    if (turns.length >= 10) {
      turns.shift();
    }

    setTurnHistory(turns);

    return () => setTurnHistory([]);
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

      {currentTurnData?.winner && (
        <button
          className={classNames(
            "absolute right-3 bottom-3 aspect-square rounded-full border-t-2 border-l-2 border-indigo-600 bg-gradient-to-b from-indigo-700 to-indigo-900 p-3 font-serif text-cyan-100",
            "hover:border-indigo-700 hover:bg-gradient-to-b hover:from-indigo-900 hover:to-indigo-800 hover:text-sky-200"
          )}
          onClick={clearTurn}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            width="32"
            height="32"
          >
            <path
              fill="currentColor"
              d="M470.6 105.4a32 32 0 0 1 0 45.3l-256 256a32 32 0 0 1-45.3 0l-128-128a32 32 0 0 1 45.3-45.3L192 338.7l233.4-233.3a32 32 0 0 1 45.3 0z"
            />
          </svg>
          <span className="sr-only">Next turn</span>
        </button>
      )}
    </div>
  );
};

export default TurnMessages;