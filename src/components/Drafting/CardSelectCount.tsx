import { usePlayerCardStore } from "@store/store";
import { MAX_HAND_CARDS } from "@utils/constants";

const CardSelectCount = () => {
  const selectedCount = usePlayerCardStore((state) => state.cards.length);

  return (
    <div className="flex items-center justify-center font-serif text-5xl text-slate-600">
      <span className={`${selectedCount > 0 ? "text-purple-500" : ""}`}>
        {selectedCount}
      </span>
      <span className="mx-3">/</span>
      <span className="">{MAX_HAND_CARDS}</span>
    </div>
  );
};

export default CardSelectCount;
