import { Dish } from "@prisma/client";
import { useHandStore } from "@store/store";
import classNames from "classnames";

type Props = {
  card: Dish;
};

const Card = ({ card }: Props) => {
  const addToHand = useHandStore((state) => state.add);
  const isSelected = useHandStore((state) => state.cards.includes(card));

  const { name } = card;

  return (
    <article
      onClick={isSelected ? undefined : () => addToHand(card)}
      className={classNames(
        "m-2 flex h-80 w-64 min-w-[16rem] flex-col justify-center rounded border-2 border-gray-500 p-6 text-center shadow-xl duration-500 hover:cursor-pointer motion-safe:hover:scale-105",
        isSelected && "scale-105 border-red-500 hover:cursor-not-allowed"
      )}
    >
      <h2 className="text-lg text-gray-700">{name}</h2>
    </article>
  );
};

export default Card;
