import { useEffect } from "react";
import { useStore } from "@store/store";
import useDrawCards from "@hooks/useDrawCards";

/**
 * Triggers fetching of enemy cards & adds them to store
 * @returns {boolean} Boolean telling if the fetch is currently in loading state
 */
const useEnemyCards = () => {
  const { cards, isLoading: isLoadingEnemyCards } = useDrawCards({
    isEnemy: true,
  });
  const addCards = useStore((state) => state.addCardsToEnemy);

  useEffect(() => {
    if (cards) {
      addCards(cards);
    }
  }, [cards]);

  return { isLoadingEnemyCards };
};

export default useEnemyCards;
