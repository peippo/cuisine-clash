import { trpc } from "@utils/trpc";
import { SELECTION_POOL_COUNT } from "@utils/constants";
import { useHandStore } from "@store/store";

import Card from "@components/Card";
import { useEffect } from "react";

const CardSelect = () => {
  const clearHand = useHandStore((state) => state.clear);
  const deck = trpc.deck.drawCards.useQuery(SELECTION_POOL_COUNT, {
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    clearHand();
  }, [deck]);

  return (
    <div className="flex flex-wrap justify-center">
      {deck.data ? (
        deck.data.map((card) => <Card key={card.id} card={card} />)
      ) : (
        <p>Shuffling cards...</p>
      )}
    </div>
  );
};

export default CardSelect;
