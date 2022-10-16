import { usePlayerCardStore } from "@store/store";
import classNames from "classnames";
import { getCardRotation } from "@utils/general";

import Card from "@components/Card/CardBase";

const HandCards = () => {
  const cards = usePlayerCardStore((state) => state.cards);
  const arenaCard = usePlayerCardStore((state) => state.arenaCard);
  const play = usePlayerCardStore((state) => state.play);

  const hasCardInArena = Boolean(arenaCard);

  return (
    <>
      <div
        className={classNames(
          "bottom bottom fixed transition-all lg:left-1/2 lg:-translate-x-1/2",
          hasCardInArena ? "-bottom-40" : "-bottom-5"
        )}
      >
        <div className="grid grid-cols-5">
          {cards.map((card, index) => (
            <div
              key={card.id}
              className={
                hasCardInArena ? "" : "hover:z-10 hover:drop-shadow-2xl"
              }
              style={{
                rotate: getCardRotation({
                  index: index + 1,
                  totalCards: cards.length,
                }),
              }}
            >
              <Card
                card={card}
                onClickHandler={() => play(card)}
                isRevealed={true}
                isDisabled={hasCardInArena}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default HandCards;
