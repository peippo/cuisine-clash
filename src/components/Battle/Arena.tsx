import { useEffect } from "react";
import { useStore } from "@store/store";
import { getRandomBetween } from "@utils/general";
import useBattleSolver from "@hooks/useBattleSolver";
import useArenaCardUpdater from "@hooks/useArenaCardUpdater";
import useDrawStartingSide from "@hooks/useDrawStartingSide";

import Card from "@components/Card/CardBase";
import TurnMessages from "./TurnMessages";
import StatusMessages from "./StatusMessages";
import CardArea from "./CardArea";

type Props = {
  isLoadingEnemyCards: boolean;
};

const Arena: React.FC<Props> = ({ isLoadingEnemyCards }) => {
  const playerCard = useStore((state) => state.playerArenaCard);
  const enemyCard = useStore((state) => state.enemyArenaCard);
  const arenaStatus = useStore((state) => state.arenaStatus);
  const playRandomEnemyCard = useStore((state) => state.playRandomEnemyCard);

  const { solveBattle } = useBattleSolver();
  useDrawStartingSide();
  useArenaCardUpdater();

  useEffect(() => {
    if (arenaStatus === "WAITING_FOR_ENEMY" && !isLoadingEnemyCards) {
      setTimeout(() => {
        playRandomEnemyCard();
      }, getRandomBetween(1000, 2000));
    }
    if (arenaStatus === "BATTLE_ONGOING") {
      solveBattle();
    }
  }, [arenaStatus, isLoadingEnemyCards]);

  return (
    <div className="flex w-full flex-wrap items-center justify-center gap-6 overflow-hidden lg:flex-nowrap xl:overflow-visible">
      <CardArea actor="player">
        {playerCard && (
          <Card card={playerCard} isDisabled={true} isRevealed={true} />
        )}
      </CardArea>

      <div className="order-3 basis-full lg:order-2">
        {arenaStatus !== "BATTLE_ONGOING" && <StatusMessages />}
        {arenaStatus === "BATTLE_ONGOING" && <TurnMessages />}
      </div>

      <CardArea actor="enemy">
        {enemyCard && (
          <Card
            card={enemyCard}
            isDisabled={true}
            isRevealed={true}
            isEnemy={true}
          />
        )}
      </CardArea>

      <div className="absolute -z-10 h-4/6 w-[95%] rounded-full border-8 border-slate-800/50 bg-slate-1000/75 bg-arena bg-repeat"></div>
    </div>
  );
};

export default Arena;
