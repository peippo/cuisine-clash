import { useEffect } from "react";
import { useHandStore, useDraftingStore } from "@store/store";
import useDrawCards from "@hooks/useDrawCards";

import Card from "@components/Card/CardBase";

const CardSelect = () => {
  const { newCards } = useDrawCards();
  const handCards = useHandStore((state) => state.cards);
  const tableCards = useDraftingStore((state) => state.tableCards);
  const setTableCards = useDraftingStore((state) => state.setTableCards);

  // Combine selected hand cards & newly fetched cards
  useEffect(() => {
    if (newCards.data) {
      const combinedCards = [...handCards, ...newCards.data];
      setTableCards(combinedCards);
    }
  }, [newCards.data]);

  return (
    <>
      <div className="flex flex-wrap justify-center">
        {newCards.data || tableCards ? (
          tableCards.map((card) => <Card key={card.id} card={card} />)
        ) : (
          <p>Shuffling cards...</p>
        )}
      </div>
    </>
  );
};

export default CardSelect;
