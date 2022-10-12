import { trpc } from "@utils/trpc";
import { useDraftingStore } from "@store/store";

const useDrawCards = () => {
  const countToFetch = useDraftingStore((state) => state.countToFetch);
  const selectedCardIds = useDraftingStore((state) => state.selectedCardIds);

  const newCards = trpc.deck.drawCards.useQuery(
    {
      count: countToFetch,
      excludeIds: selectedCardIds,
    },
    {
      refetchOnWindowFocus: false,
    }
  );

  return { newCards };
};

export default useDrawCards;
