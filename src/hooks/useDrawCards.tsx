import { trpc } from "@utils/trpc";
import { useStore } from "@store/store";
import { MAX_HAND_CARDS } from "@utils/constants";

const useDrawCards = ({ isEnemy = false } = {}) => {
  const countToFetch = useStore((state) => state.countToFetch);
  const selectedCardIds = useStore((state) => state.selectedCardIds);

  const { data, isLoading } = trpc.deck.drawCards.useQuery(
    {
      count: isEnemy ? MAX_HAND_CARDS : countToFetch,
      excludeIds: selectedCardIds,
    },
    {
      refetchOnWindowFocus: false,
    }
  );

  return { cards: data, isLoading };
};

export default useDrawCards;
