import { useEffect } from "react";
import { useStore } from "@store/store";
import useDrawCards from "@hooks/useDrawCards";

const useEnemyCards = () => {
  const { cards } = useDrawCards({ isEnemy: true });
  const addCards = useStore((state) => state.addCardsToEnemy);

  useEffect(() => {
    if (cards) {
      addCards(cards);
    }
  }, [cards]);
};

export default useEnemyCards;
