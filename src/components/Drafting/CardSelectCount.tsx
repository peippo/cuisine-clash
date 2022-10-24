import { useStore } from "@store/store";
import { MAX_HAND_CARDS } from "@utils/constants";

const CardSelectCount = () => {
  const selectedCount = useStore((state) => state.playerCards.length);

  return (
    <div className="order-2 flex flex-col rounded-t-2xl border-t-2 border-indigo-600 bg-gradient-to-t from-indigo-900 via-indigo-900 to-indigo-800 px-6 pt-2 pb-1 font-serif text-4xl text-indigo-700 md:text-5xl lg:order-1 lg:px-6 lg:pt-4 lg:pb-2">
      <div className="flex items-center justify-center">
        <span
          className={`${
            selectedCount > 0 ? "text-indigo-300" : "text-indigo-500"
          }`}
        >
          {selectedCount}
        </span>
        <span className="mx-2">/</span>
        <span className="text-indigo-500">{MAX_HAND_CARDS}</span>
      </div>
      <span className="mt-1 text-center text-xs uppercase tracking-widest text-indigo-400">
        selected
      </span>
    </div>
  );
};

export default CardSelectCount;
