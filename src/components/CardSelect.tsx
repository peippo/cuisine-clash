import { useState, useEffect } from "react";
import { trpc } from "@utils/trpc";
import { Dish } from "@prisma/client";
import { MAX_DRAFT_CARDS, MAX_HAND_CARDS } from "@utils/constants";
import { useHandStore } from "@store/store";
import classNames from "classnames";

import Card from "@components/Card/CardBase";

const CardSelect = () => {
  const [fetchCount, setFetchCount] = useState<number>(MAX_DRAFT_CARDS);
  const [handCardIds, setHandCardIds] = useState<number[]>([]);
  const [tableCards, setTableCards] = useState<Dish[]>([]);
  const [redraws, setRedraws] = useState<number>(2);
  const handCards = useHandStore((state) => state.cards);

  const hasRedraws = redraws !== 0;

  const deck = trpc.deck.drawCards.useQuery(
    {
      count: fetchCount,
      handCardIds: handCardIds,
    },
    {
      refetchOnWindowFocus: false,
    }
  );

  // Replace unselected cards on table w/ new ones
  const handleRefetch = () => {
    setHandCardIds(handCards.map((card) => card.id));
    setFetchCount(MAX_DRAFT_CARDS - handCards.length);
    setRedraws((redraws) => (redraws -= 1));

    deck.refetch();
  };

  // Combine selected hand cards & newly fetched cards
  useEffect(() => {
    if (deck.data) {
      const combinedCards = [...handCards, ...deck.data];
      setTableCards(combinedCards);
    }
  }, [deck.data]);

  return (
    <>
      <div className="flex flex-wrap justify-center">
        {deck.data || tableCards ? (
          tableCards.map((card) => <Card key={card.id} card={card} />)
        ) : (
          <p>Shuffling cards...</p>
        )}
      </div>

      <button
        className={classNames(
          "group relative mt-5 self-center rounded-xl bg-gradient-to-r from-indigo-700 to-indigo-900 font-serif text-cyan-100",
          "disabled:from-slate-700 disabled:to-slate-900 disabled:text-slate-400"
        )}
        onClick={handleRefetch}
        disabled={
          !hasRedraws || handCards.length === MAX_HAND_CARDS || deck.isLoading
        }
      >
        <span
          className={classNames(
            "absolute -right-2 -top-2 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-b from-purple-500 via-purple-800 to-fuchsia-900 text-3xl text-white drop-shadow-md",
            "group-disabled:from-stone-500 group-disabled:via-stone-800 group-disabled:to-stone-900 group-disabled:text-stone-500"
          )}
        >
          {redraws}
        </span>
        <span className="sr-only">redraws available</span>
        <span className="flex py-2 pr-16 pl-5 text-lg">
          {hasRedraws
            ? `Redraw ${MAX_DRAFT_CARDS - handCards.length} cards`
            : "No redraws"}
        </span>
      </button>
    </>
  );
};

export default CardSelect;
