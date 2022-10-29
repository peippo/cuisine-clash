import classNames from "classnames";
import { MAX_DRAFT_CARDS } from "@utils/constants";
import { useStore } from "@store/store";
import useDrawCards from "@hooks/useDrawCards";
import { Spinner } from "@components/Icons";

const RedrawButton = () => {
  const playerCards = useStore((state) => state.playerCards);
  const isPlayerHandFull = useStore((state) => state.isPlayerHandFull);
  const redrawsLeft = useStore((state) => state.redrawsLeft);
  const redraw = useStore((state) => state.redraw);
  const { isLoading } = useDrawCards();

  const hasRedraws = redrawsLeft !== 0;

  return (
    <button
      className={classNames(
        "group relative order-3 self-center rounded-lg border-t-2 border-l-2 border-indigo-600 bg-gradient-to-b from-indigo-700 to-indigo-900 text-cyan-100",
        "disabled:cursor-not-allowed disabled:border-slate-600 disabled:from-slate-700 disabled:to-slate-700 disabled:text-slate-400",
        "hover:border-indigo-700 hover:bg-gradient-to-b hover:from-indigo-900 hover:to-indigo-800"
      )}
      onClick={() => redraw()}
      disabled={!hasRedraws || isPlayerHandFull || isLoading}
    >
      <span
        className={classNames(
          "absolute -right-2 -top-3 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-b from-purple-500 via-purple-800 to-fuchsia-900 text-2xl text-white drop-shadow-md md:h-16 md:w-16 md:text-3xl",
          "group-disabled:from-stone-500 group-disabled:via-stone-800 group-disabled:to-stone-900 group-disabled:text-stone-500"
        )}
      >
        {isLoading ? (
          <Spinner width="32" className="animate-spin text-purple-500" />
        ) : (
          redrawsLeft
        )}
      </span>
      {!isLoading && <span className="sr-only">rerolls available</span>}

      <span className="flex pr-16 pt-1 pb-2 pl-5 md:pr-20 md:text-lg">
        {hasRedraws
          ? `Reroll ${MAX_DRAFT_CARDS - playerCards.length} cards`
          : "No rerolls left"}
      </span>
    </button>
  );
};

export default RedrawButton;
