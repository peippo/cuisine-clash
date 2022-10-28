import { useStore } from "@store/store";
import classNames from "classnames";

import { FastForwardIcon, ForwardIcon, PlayIcon } from "@components/Icons";

const TurnSpeedSelector = () => {
  const turnSpeed = useStore((state) => state.turnSpeed);
  const setTurnSpeed = useStore((state) => state.setTurnSpeed);

  return (
    <div className="absolute top-1 right-1 z-10 rounded-md">
      <span className="sr-only">Set turn message speed</span>

      <button
        className="hover:cursor-pointer"
        onClick={() => setTurnSpeed(600)}
        aria-selected={turnSpeed === 600}
      >
        <PlayIcon
          width="26"
          className={classNames(
            "rounded-l-md bg-slate-700 p-2 text-slate-400",
            turnSpeed === 600 && "bg-indigo-600 text-slate-200"
          )}
        />
        <span className="sr-only">Normal</span>
      </button>
      <button
        className="hover:cursor-pointer"
        onClick={() => setTurnSpeed(300)}
        aria-selected={turnSpeed === 300}
      >
        <ForwardIcon
          width="28"
          className={classNames(
            "bg-slate-700 p-2 text-slate-400",
            turnSpeed === 300 && "bg-indigo-600 text-slate-200"
          )}
        />
        <span className="sr-only">Fast</span>
      </button>
      <button
        className="hover:cursor-pointer"
        onClick={() => setTurnSpeed(150)}
        aria-selected={turnSpeed === 150}
      >
        <FastForwardIcon
          width="28"
          className={classNames(
            "rounded-r-md bg-slate-700 p-2 text-slate-400",
            turnSpeed === 150 && "bg-indigo-600 text-slate-200"
          )}
        />
        <span className="sr-only">Fastest</span>
      </button>
    </div>
  );
};

export default TurnSpeedSelector;
