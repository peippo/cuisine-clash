import { useStore } from "@store/store";
import { getCardRotation } from "@utils/general";

import Card from "@components/Card/CardBase";

const EnemyCards = () => {
  const enemyCards = useStore((state) => state.enemyCards);

  return (
    <>
      <div className="bottom fixed -top-40 transition-all lg:left-1/2 lg:-translate-x-1/2">
        <div className={`grid grid-cols-${enemyCards.length}`}>
          {enemyCards.map((card, index) => (
            <div
              key={card.id}
              style={{
                rotate: getCardRotation({
                  index: index + 1,
                  totalCards: enemyCards.length,
                  upsideDown: true,
                }),
              }}
            >
              <Card
                card={card}
                isRevealed={false}
                isDisabled={true}
                isFaceDown={true}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default EnemyCards;
