import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { useStore } from "@store/store";
import { getRandomBetween } from "@utils/general";
import { Battlers } from "@customTypes/types";

import { ShieldIcon } from "@components/Icons";

type Props = {
  actor: Battlers;
};

// FIXME: Fix the warnings
gsap.config({
  nullTargetWarn: false,
});

const DamageIndicator: React.FC<Props> = ({ actor }) => {
  const turn = useStore((state) => state.turnData);

  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(".indicator", {
        top: `-${getRandomBetween(40, 100)}`,
        opacity: 0,
        duration: 1,
      });
    }, containerRef);

    return () => ctx.revert();
  }, [turn]);

  return (
    <div className="absolute -top-5 w-full" ref={containerRef}>
      {turn && turn.actor !== actor && turn.damage > 0 && (
        <span className="indicator absolute left-1/2 -translate-x-1/2 text-4xl font-bold text-red-700 shadow-lg">
          {turn.damage}
        </span>
      )}

      {turn && turn.actor !== actor && turn?.isBlocked && (
        <span className="indicator absolute left-1/2 -translate-x-1/2 text-sky-400 shadow-lg">
          <ShieldIcon width="32" />
        </span>
      )}
    </div>
  );
};

export default DamageIndicator;
