import { usePlayerCardStore } from "@store/store";

import Card from "@components/Card/CardBase";

const Arena = () => {
  const playerCard = usePlayerCardStore((state) => state.arenaCard);

  return (
    <>
      {playerCard && (
        <Card card={playerCard} isDisabled={true} isRevealed={true} />
      )}
    </>
  );
};

export default Arena;
