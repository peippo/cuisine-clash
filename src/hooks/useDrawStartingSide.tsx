import { useEffect } from "react";
import { useStore } from "@store/store";
import { Battlers } from "@customTypes/types";

const useDrawStartingSide = () => {
  const arenaStatus = useStore((state) => state.arenaStatus);
  const startingSide = useStore((state) => state.startingSide);
  const setStartingSide = useStore((state) => state.setStartingSide);
  const updateArenaStatus = useStore((state) => state.updateArenaStatus);

  const randomStartingSide = ["player", "enemy"][
    Math.floor(Math.random() * 2)
  ] as Battlers;

  useEffect(() => {
    if (startingSide || arenaStatus === "BATTLE_FINISHED") return;

    setStartingSide(randomStartingSide);
    updateArenaStatus(
      randomStartingSide === "player"
        ? "WAITING_FOR_PLAYER"
        : "WAITING_FOR_ENEMY"
    );
  }, [randomStartingSide]);
};

export default useDrawStartingSide;
