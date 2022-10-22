import { useEffect } from "react";
import { useStore } from "@store/store";
import useDrawCards from "@hooks/useDrawCards";

import Card from "@components/Card/CardBase";

const CardSelect = () => {
  const { cards } = useDrawCards();
  const playerCards = useStore((state) => state.playerCards);
  const addToPlayerHand = useStore((state) => state.addToPlayerHand);
  const tableCards = useStore((state) => state.tableCards);
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
      <div className="flex flex-wrap justify-center">
        {cards || tableCards.length ? (
          tableCards.map((card) => (
            <Card
              key={card.id}
              card={card}
              onClickHandler={() => addToPlayerHand(card)}
              isRevealed={playerCards.includes(card)}
              isDisabled={playerCards.includes(card)}
            />
          ))
        ) : (
          <p>Shuffling cards...</p>
        )}
      </div>
    </>
  );
};

export default CardSelect;
