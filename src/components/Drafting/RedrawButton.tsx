import classNames from "classnames";
import { MAX_DRAFT_CARDS } from "@utils/constants";
import { useStore } from "@store/store";
import useDrawCards from "@hooks/useDrawCards";

const RedrawButton = () => {
  const playerCards = useStore((state) => state.playerCards);
  const isPlayerHandFull = useStore((state) => state.isPlayerHandFull);
  const redrawsLeft = useStore((state) => state.redrawsLeft);
  const redraw = useStore((state) => state.redraw);
  const { isLoading, refetch } = useDrawCards();

  const hasRedraws = redrawsLeft !== 0;

  return (
    <button
      className={classNames(
        "group relative self-center rounded-xl border-t-2 border-l-2 border-indigo-600 bg-gradient-to-b from-indigo-700 to-indigo-900 font-serif text-cyan-100",
        "disabled:border-slate-600 disabled:from-slate-700 disabled:to-slate-700 disabled:text-slate-400",
        "hover:border-indigo-700 hover:bg-gradient-to-b hover:from-indigo-900 hover:to-indigo-800"
      )}
      onClick={() => redraw(refetch)}
      disabled={!hasRedraws || isPlayerHandFull || isLoading}
    >
      <span
        className={classNames(
          "absolute -right-2 -top-2 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-b from-purple-500 via-purple-800 to-fuchsia-900 text-3xl text-white drop-shadow-md",
          "group-disabled:from-stone-500 group-disabled:via-stone-800 group-disabled:to-stone-900 group-disabled:text-stone-500"
        )}
      >
        {redrawsLeft}
      </span>
      <span className="sr-only">redraws available</span>
      <span className="flex py-2 pr-16 pl-5 text-lg">
        {hasRedraws
          ? `Redraw ${MAX_DRAFT_CARDS - playerCards.length} cards`
          : "No redraws left"}
      </span>
    </button>
  );
};

export default RedrawButton;
