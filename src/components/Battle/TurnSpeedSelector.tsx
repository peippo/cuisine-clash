import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { useStore } from "@store/store";
import classNames from "classnames";

import { FastForwardIcon, ForwardIcon, PlayIcon } from "@components/Icons";

const TurnSpeedSelector = () => {
  const turnSpeed = useStore((state) => state.turnSpeed);
  const setTurnSpeed = useStore((state) => state.setTurnSpeed);

  const containerRef = useRef<HTMLFieldSetElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(containerRef.current, {
        opacity: 0,
        delay: 0.5,
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <fieldset
      ref={containerRef}
      className="absolute top-2 right-2 z-10 flex rounded-md"
    >
      <legend className="sr-only">Set turn message speed</legend>

      <label
        className={classNames(
          "flex h-7 w-7 items-center justify-center rounded-l-md bg-slate-700 p-2 text-slate-400 hover:cursor-pointer",
          turnSpeed === 600 && "bg-indigo-600 text-slate-200"
        )}
      >
        <input
          type="radio"
          onChange={() => setTurnSpeed(600)}
          checked={turnSpeed === 600}
          className="sr-only"
        />
        <PlayIcon width="10" />
        <span className="sr-only">Normal</span>
      </label>
      <label
        className={classNames(
          "flex h-7 w-7 items-center justify-center bg-slate-700 p-2 text-slate-400 hover:cursor-pointer",
          turnSpeed === 300 && "bg-indigo-600 text-slate-200"
        )}
      >
        <input
          type="radio"
          onChange={() => setTurnSpeed(300)}
          checked={turnSpeed === 300}
          className="sr-only"
        />
        <ForwardIcon width="12" />
        <span className="sr-only">Fast</span>
      </label>
      <label
        className={classNames(
          "flex h-7 w-7 items-center justify-center rounded-r-md bg-slate-700 p-2 text-slate-400 hover:cursor-pointer",
          turnSpeed === 150 && "bg-indigo-600 text-slate-200"
        )}
      >
        <input
          type="radio"
          onChange={() => setTurnSpeed(150)}
          checked={turnSpeed === 150}
          className="sr-only"
        />
        <FastForwardIcon width="12" />
        <span className="sr-only">Fastest</span>
      </label>
    </fieldset>
  );
};

export default TurnSpeedSelector;
