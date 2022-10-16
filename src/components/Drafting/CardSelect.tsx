import { useEffect } from "react";
import { usePlayerCardStore, useDraftingStore } from "@store/store";
import useDrawCards from "@hooks/useDrawCards";

import Card from "@components/Card/CardBase";

const CardSelect = () => {
  const { cards } = useDrawCards();
  const handCards = usePlayerCardStore((state) => state.cards);
  const addToHand = usePlayerCardStore((state) => state.add);
  const tableCards = useDraftingStore((state) => state.tableCards);
  const setTableCards = useDraftingStore((state) => state.setTableCards);

  // Combine selected hand cards & newly fetched cards
  useEffect(() => {
    if (cards) {
      const combinedCards = [...handCards, ...cards];
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
              onClickHandler={() => addToHand(card)}
              isRevealed={handCards.includes(card)}
              isDisabled={handCards.includes(card)}
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
