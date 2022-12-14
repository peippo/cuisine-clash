import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { useStore } from "@store/store";
import classNames from "classnames";
import { getCardRotation } from "@utils/cards";

import Card from "@components/Card/CardBase";

const HandCards = () => {
  const playerCards = useStore((state) => state.playerCards);
  const arenaStatus = useStore((state) => state.arenaStatus);
  const playCard = useStore((state) => state.playCard);

  const isPlayerTurn = arenaStatus === "WAITING_FOR_PLAYER";

  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".card", {
        bottom: "-100%",
        stagger: {
          each: 0.1,
          grid: [5, 1],
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <div
        ref={containerRef}
        className={classNames(
          "bottom bottom fixed transition-all lg:left-1/2 lg:-translate-x-1/2",
          isPlayerTurn ? "-bottom-5" : "-bottom-40"
        )}
      >
        <div role="listbox" className={`grid grid-cols-${playerCards.length}`}>
          {playerCards.map((card, index) => (
            <div
              key={card.id}
              className={classNames(
                isPlayerTurn && "hover:z-10 hover:drop-shadow-2xl"
              )}
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
                isDisabled={!isPlayerTurn}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default HandCards;
