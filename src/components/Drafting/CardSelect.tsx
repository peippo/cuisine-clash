import { useEffect } from "react";
import { useStore } from "@store/store";
import useDrawCards from "@hooks/useDrawCards";
import { MAX_HAND_CARDS } from "@utils/constants";

import Card from "@components/Card/CardBase";
import LoadingShuffle from "./LoadingShuffle";

const CardSelect = () => {
  const { cards } = useDrawCards();
  const playerCards = useStore((state) => state.playerCards);
  const tableCards = useStore((state) => state.tableCards);
  const addToPlayerHand = useStore((state) => state.addToPlayerHand);
  const setTableCards = useStore((state) => state.setTableCards);

  // Combine selected hand cards & newly fetched cards
  useEffect(() => {
    if (cards) {
      const combinedCards = [...playerCards, ...cards];
      setTableCards(combinedCards);
    }
  }, [cards]);

  return (
    <>
      <div
        role="listbox"
        className="flex min-h-[40rem] w-full flex-wrap items-center justify-center border-t-8 border-indigo-900 pt-5 pb-10 2xl:px-16"
      >
        {cards || tableCards.length ? (
          tableCards.map((card) => (
            <Card
              key={card.id}
              card={card}
              onClickHandler={() => addToPlayerHand(card)}
              isRevealed={playerCards.includes(card)}
              isDisabled={
                playerCards.includes(card) ||
                playerCards.length === MAX_HAND_CARDS
              }
            />
          ))
        ) : (
          <LoadingShuffle />
        )}
      </div>
    </>
  );
};

export default CardSelect;
