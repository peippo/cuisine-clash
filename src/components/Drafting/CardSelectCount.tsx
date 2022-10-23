import { useStore } from "@store/store";
import { MAX_HAND_CARDS } from "@utils/constants";

const CardSelectCount = () => {
  const selectedCount = useStore((state) => state.playerCards.length);

  return (
    <div className="flex items-center justify-center font-serif text-4xl text-slate-600 md:text-5xl">
      <span className={`${selectedCount > 0 ? "text-purple-500" : ""}`}>
        {selectedCount}
      </span>
      <span className="mx-3">/</span>
      <span className="">{MAX_HAND_CARDS}</span>
    </div>
  );
};

export default CardSelectCount;
