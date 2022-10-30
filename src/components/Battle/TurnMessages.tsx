import { useState, useEffect, useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { useStore } from "@store/store";
import classNames from "classnames";
import type { TurnData } from "@customTypes/types";

import {
  EnemyAttackIcon,
  PlayerAttackIcon,
  ShieldIcon,
} from "@components/Icons";
import TurnSpeedSelector from "./TurnSpeedSelector";
import NextTurnButton from "./NextTurnButton";

const TurnMessages = () => {
  const currentTurnData = useStore((state) => state.turnData);
  const [turnHistory, setTurnHistory] = useState<TurnData[]>([]);

  const messageBoxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!currentTurnData) return;

    const turns = turnHistory
      ? [...turnHistory, currentTurnData as TurnData]
      : [currentTurnData as TurnData];

    if (turns.length >= 10) {
      turns.shift();
    }

    setTurnHistory(turns);

    return () => setTurnHistory([]);
  }, [currentTurnData]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(messageBoxRef.current, {
        top: -30,
        opacity: 0,
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={messageBoxRef}
      className={classNames(
        "box relative flex h-72 w-full flex-col justify-end overflow-hidden rounded-lg border-t border-indigo-900 bg-slate-1000/75 shadow-xl",
        "after:absolute after:top-0 after:left-0 after:h-32 after:w-full after:bg-gradient-to-b after:from-slate-1000"
      )}
    >
      {turnHistory?.map(({ round, actor, message, isBlocked, winner }) => (
        <div
          className="flex items-center border-b border-indigo-900 pr-4"
          key={round}
        >
          <span className="mr-2 inline-block w-12 bg-indigo-900 py-1 px-3 text-right text-indigo-300">
            {round}
          </span>
          <div
            className={classNames(
              "flex",
              winner && "text-red-500",
              !winner && actor === "player" && "text-slate-300",
              !winner && actor === "enemy" && "text-slate-400"
            )}
          >
            {isBlocked ? (
              <ShieldIcon width="14" className="mr-2" />
            ) : actor === "player" ? (
              <PlayerAttackIcon width="14" className="mr-2" />
            ) : (
              <EnemyAttackIcon width="14" className="mr-2" />
            )}

            <p className="message w-[39rem] truncate 2xl:w-[55rem]">
              {message}
            </p>
          </div>
        </div>
      ))}

      {currentTurnData?.winner && <NextTurnButton />}

      <TurnSpeedSelector />
    </div>
  );
};

export default TurnMessages;
