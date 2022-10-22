import { useStore } from "@store/store";
import classNames from "classnames";
import { getCardRotation } from "@utils/general";

import Card from "@components/Card/CardBase";

const HandCards = () => {
  const playerCards = useStore((state) => state.playerCards);
  const playerArenaCard = useStore((state) => state.playerArenaCard);
  const playCard = useStore((state) => state.playCard);

  const hasCardInArena = Boolean(playerArenaCard);

  return (
    <>
      <div
        className={classNames(
          "bottom bottom fixed transition-all lg:left-1/2 lg:-translate-x-1/2",
          hasCardInArena ? "-bottom-40" : "-bottom-5"
        )}
      >
        <div className="grid grid-cols-5">
          {playerCards.map((card, index) => (
            <div
              key={card.id}
              className={
                hasCardInArena ? "" : "hover:z-10 hover:drop-shadow-2xl"
              }
              style={{
                rotate: getCardRotation({
                  index: index + 1,
                  totalCards: playerCards.length,
                }),
              }}
            >
              <Card
                card={card}
                onClickHandler={() => playCard(card)}
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
