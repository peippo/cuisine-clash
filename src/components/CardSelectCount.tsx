import { useHandStore } from "@store/store";
import { MAX_HAND_CARDS } from "@utils/constants";

const CardSelectCount = () => {
  const selectedCount = useHandStore((state) => state.cards.length);

  return (
    <div className="my-8 flex justify-center text-6xl">
      {selectedCount} / {MAX_HAND_CARDS}
    </div>
  );
};

export default CardSelectCount;
