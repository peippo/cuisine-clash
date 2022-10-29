import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { useStore } from "@store/store";
import { getCardRotation } from "@utils/cards";

import Card from "@components/Card/CardBase";

const EnemyCards = () => {
  const enemyCards = useStore((state) => state.enemyCards);

  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".card", {
        top: "-100%",
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
      <div className="bottom fixed -top-40 transition-all lg:left-1/2 lg:-translate-x-1/2">
        <div
          ref={containerRef}
          className={`grid grid-cols-${enemyCards.length}`}
        >
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
