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
};

const CardBase = ({
  card,
  onClickHandler,
  isRevealed,
  isDisabled,
  isFaceDown = false,
}: Props) => {
  const { name, energy, carb, protein } = card;

  return (
    <article
      onClick={
        !onClickHandler || isDisabled ? undefined : () => onClickHandler()
      }
      className={classNames(
        "mx-3 my-4 flex h-72 w-52 min-w-[13rem] flex-col justify-center rounded-lg bg-slate-800 p-2 text-center shadow-xl duration-300 hover:cursor-pointer motion-safe:hover:scale-105",
        isRevealed &&
          isDisabled &&
          "scale-105 motion-safe:hover:cursor-default",
        isFaceDown &&
          "scale-75 bg-slate-900 motion-safe:hover:scale-75 motion-safe:hover:cursor-default"
      )}
    >
      <div className="flex h-full w-full flex-col rounded-md bg-gradient-to-b from-slate-600 to-slate-800 p-3">
        {!isFaceDown && (
          <>
            <div
              className={`mb-auto -mt-6 w-full rounded-b-xl rounded-t-md p-2 ${
                isRevealed
                  ? "border-t-4 border-b border-t-cyan-700 border-b-slate-800 bg-gradient-to-b from-cyan-800 to-cyan-700 shadow-lg"
                  : "bg-slate-800"
              }`}
            >
              <h2 className="text-sm text-gray-300 drop-shadow-md">{name}</h2>
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
