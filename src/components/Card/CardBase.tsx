import { Dish } from "@prisma/client";
import { useHandStore } from "@store/store";
import classNames from "classnames";
import RevealedStats from "./RevealedStats";
import HiddenStats from "./HiddenStats";

type Props = {
  card: Dish;
};

const CardBase = ({ card }: Props) => {
  const addToHand = useHandStore((state) => state.add);
  const isSelected = useHandStore((state) => state.cards.includes(card));

  const { name, energy, carb, protein } = card;

  return (
    <article
      onClick={isSelected ? undefined : () => addToHand(card)}
      className={classNames(
        "mx-3 my-4 flex h-80 w-64 min-w-[16rem] flex-col justify-center rounded-lg bg-slate-800 p-2 text-center shadow-xl duration-300 hover:cursor-pointer motion-safe:hover:scale-105",
        isSelected && "scale-105 hover:cursor-not-allowed"
      )}
    >
      <div className="flex h-full w-full flex-col rounded-md bg-gradient-to-b from-slate-600 to-slate-800 p-3">
        <div
          className={`mb-auto -mt-6 w-full rounded-b-xl rounded-t-md p-2 ${
            isSelected
              ? "border-t border-b border-t-cyan-200 border-b-slate-800 bg-gradient-to-b from-cyan-800 to-cyan-700 shadow-lg"
              : "bg-slate-800"
          }`}
        >
          <h2 className="text-md text-gray-300 drop-shadow-md">{name}</h2>
        </div>

        {isSelected ? (
          <RevealedStats energy={energy} carb={carb} protein={protein} />
        ) : (
          <HiddenStats />
        )}
      </div>
    </article>
  );
};

export default CardBase;
