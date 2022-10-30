import { trpc } from "@utils/trpc";
import { useStore } from "@store/store";
import { MAX_HAND_CARDS } from "@utils/constants";

/**
 * Fetch cards from database
 * @param {boolean} isEnemy If set to true, fetches cards for enemy
 * @returns {array} Fetched cards
 * @returns {boolean} Boolean telling if the fetch is currently in loading state
 */
const useDrawCards = ({ isEnemy = false } = {}) => {
  const redrawsLeft = useStore((state) => state.redrawsLeft);
  const countToFetch = useStore((state) => state.countToFetch);
  const selectedCardIds = useStore((state) => state.selectedCardIds);

  const { data, isLoading } = trpc.deck.drawCards.useQuery(
    {
      count: isEnemy ? MAX_HAND_CARDS : countToFetch,
      excludeIds: selectedCardIds,
      redrawsLeft: redrawsLeft,
    },
    {
      refetchOnWindowFocus: false,
    }
  );

  return { cards: data, isLoading };
};

export default useDrawCards;
