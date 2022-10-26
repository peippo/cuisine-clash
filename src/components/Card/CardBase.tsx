import React from "react";
import { Dish } from "@prisma/client";
import classNames from "classnames";
import RevealedStats from "./RevealedStats";
import HiddenStats from "./HiddenStats";
import useCardVariables from "@hooks/useCardVariables";
import { CardRarity } from "@customTypes/types";
import { useStore } from "@store/store";

type Props = {
  card: Dish;
  onClickHandler?: () => void;
  isRevealed?: boolean;
  isDisabled?: boolean;
  isFaceDown?: boolean;
  isEnemy?: boolean;
};

const CardBase = ({
  card,
  onClickHandler,
  isRevealed,
  isDisabled,
  isFaceDown = false,
  isEnemy = false,
}: Props) => {
  const view = useStore((state) => state.view);
  const { name, energy, carb, protein, fat, rarity } = card;
  const { ref, variables } = useCardVariables();

  const isDead = !energy;

  const styleVariables = {
    "--x": variables.x,
    "--y": variables.y,
    "--rX": variables.rX,
    "--rY": variables.rY,
    "--bgX": variables.bgX,
    "--bgY": variables.bgY,
  } as React.CSSProperties;

  return (
    <article
      ref={ref}
      style={styleVariables}
      onClick={
        !onClickHandler || isDisabled ? undefined : () => onClickHandler()
      }
      className={classNames(
        "card relative mx-3 my-4 flex h-72 w-52 min-w-[13rem] flex-col justify-center p-2 text-center duration-300",
        !isDisabled && "hover:cursor-pointer",
        !isDisabled && "card--active",
        view === "DRAFTING" && "card--active",
        isFaceDown &&
          "scale-75 bg-slate-900 motion-safe:hover:scale-75 motion-safe:hover:cursor-default",
        isDead && "scale scale-90 opacity-70",
        isDead && !isEnemy && "-rotate-3",
        isDead && isEnemy && "rotate-3"
      )}
    >
      <div className="card__wrapper absolute inset-0 mt-0 mb-auto">
        <div className="card__3d absolute inset-0">
          <div
            className={classNames(
              "flex h-full w-full select-none flex-col rounded-xl border-8 p-3",
              !isRevealed &&
                "border-slate-900 bg-gradient-to-b from-slate-600 to-slate-800",
              isRevealed &&
                rarity === "COMMON" &&
                "border-slate-800 bg-gradient-to-b from-slate-600 to-slate-800",
              isRevealed && rarity === "EPIC" && "border-epic-light bg-epic",
              isRevealed &&
                rarity === "LEGENDARY" &&
                "border-legendary-light bg-legendary"
            )}
          >
            {!isFaceDown && (
              <>
                <div
                  className={classNames(
                    "relative z-40 mb-auto -mt-6 w-full rounded-b-xl rounded-t-md border-t-4 border-b p-2 transition-all",
                    isRevealed &&
                      rarity === "COMMON" &&
                      "border-t-cyan-700 border-b-slate-800 bg-gradient-to-b from-cyan-800 to-cyan-700 shadow-lg",
                    isRevealed &&
                      rarity === "EPIC" &&
                      "border-t-purple-700 border-b-slate-800 bg-gradient-to-b from-purple-800 to-purple-700 shadow-lg",
                    isRevealed &&
                      rarity === "LEGENDARY" &&
                      "border-t-yellow-700 border-b-slate-800 bg-gradient-to-b from-yellow-800 to-yellow-700 shadow-lg",
                    isDead ||
                      (!isRevealed &&
                        "border-t-slate-800 border-b-slate-800 bg-slate-800")
                  )}
                >
                  <h2
                    className={classNames(
                      "text-sm text-gray-300 drop-shadow-md"
                    )}
                  >
                    {name}
                  </h2>
                </div>

                {isRevealed ? (
                  <RevealedStats
                    energy={energy}
                    carb={carb}
                    protein={protein}
                    fat={fat}
                    rarity={rarity as CardRarity}
                  />
                ) : (
                  <HiddenStats />
                )}
              </>
            )}
          </div>
          <div className="card__soft absolute inset-0 z-30"></div>
          {isRevealed && rarity !== "COMMON" && (
            <div className="card__blend absolute inset-0 after:absolute after:inset-0"></div>
          )}
        </div>
      </div>
    </article>
  );
};

export default CardBase;
