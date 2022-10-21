import { Dish } from "@prisma/client";
import classNames from "classnames";
import RevealedStats from "./RevealedStats";
import HiddenStats from "./HiddenStats";

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
  const { name, energy, carb, protein } = card;

  const isDead = !energy;

  return (
    <article
      onClick={
        !onClickHandler || isDisabled ? undefined : () => onClickHandler()
      }
      className={classNames(
        "mx-3 my-4 flex h-72 w-52 min-w-[13rem] flex-col justify-center rounded-lg bg-slate-800 p-2 text-center shadow-xl duration-300",
        !isDisabled && "hover:cursor-pointer motion-safe:hover:scale-105",
        isFaceDown &&
          "scale-75 bg-slate-900 motion-safe:hover:scale-75 motion-safe:hover:cursor-default",
        isDead && "scale scale-90 opacity-70",
        isDead && !isEnemy && "-rotate-3",
        isDead && isEnemy && "rotate-3"
      )}
    >
      <div className="flex h-full w-full select-none flex-col rounded-md bg-gradient-to-b from-slate-600 to-slate-800 p-3">
        {!isFaceDown && (
          <>
            <div
              className={`mb-auto -mt-6 w-full rounded-b-xl rounded-t-md border-t-4 border-b p-2 transition-all ${
                isRevealed && !isDead
                  ? "border-t-cyan-700 border-b-slate-800 bg-gradient-to-b from-cyan-800 to-cyan-700 shadow-lg"
                  : "border-t-slate-800 border-b-slate-800 bg-slate-800"
              }`}
            >
              <h2
                className={classNames("text-sm text-gray-300 drop-shadow-md")}
              >
                {name}
              </h2>
            </div>

            {isRevealed ? (
              <RevealedStats energy={energy} carb={carb} protein={protein} />
            ) : (
              <HiddenStats />
            )}
          </>
        )}
      </div>
    </article>
  );
};

export default CardBase;
