import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { useStore } from "@store/store";
import classNames from "classnames";

import { FastForwardIcon, ForwardIcon, PlayIcon } from "@components/Icons";

const TurnSpeedSelector = () => {
  const turnSpeed = useStore((state) => state.turnSpeed);
  const setTurnSpeed = useStore((state) => state.setTurnSpeed);

  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(containerRef.current, {
        opacity: 0,
        delay: 0.5,
      });
    });

    return () => ctx.revert();
  }, []);

  // FIXME: Use radio buttons

  return (
    <div
      ref={containerRef}
      className="absolute top-2 right-2 z-10 flex rounded-md"
    >
      <span className="sr-only">Set turn message speed</span>

      <button
        className={classNames(
          "flex h-7 w-7 items-center justify-center rounded-l-md bg-slate-700 p-2 text-slate-400 hover:cursor-pointer",
          turnSpeed === 600 && "bg-indigo-600 text-slate-200"
        )}
        onClick={() => setTurnSpeed(600)}
        aria-selected={turnSpeed === 600}
      >
        <PlayIcon width="10" />
        <span className="sr-only">Normal</span>
      </button>
      <button
        className={classNames(
          "flex h-7 w-7 items-center justify-center bg-slate-700 p-2 text-slate-400 hover:cursor-pointer",
          turnSpeed === 300 && "bg-indigo-600 text-slate-200"
        )}
        onClick={() => setTurnSpeed(300)}
        aria-selected={turnSpeed === 300}
      >
        <ForwardIcon width="12" />
        <span className="sr-only">Fast</span>
      </button>
      <button
        className={classNames(
          "flex h-7 w-7 items-center justify-center rounded-r-md bg-slate-700 p-2 text-slate-400 hover:cursor-pointer",
          turnSpeed === 150 && "bg-indigo-600 text-slate-200"
        )}
        onClick={() => setTurnSpeed(150)}
        aria-selected={turnSpeed === 150}
      >
        <FastForwardIcon width="12" />
        <span className="sr-only">Fastest</span>
      </button>
    </div>
  );
};

export default TurnSpeedSelector;
