import { useEffect } from "react";
import { useEnemyCardStore } from "@store/store";
import useDrawCards from "@hooks/useDrawCards";

const useEnemyCards = () => {
  const { cards } = useDrawCards({ isEnemy: true });
  const addCards = useEnemyCardStore((state) => state.addCards);

  useEffect(() => {
    if (cards) {
      addCards(cards);
    }
  }, [cards]);
};

export default useEnemyCards;
