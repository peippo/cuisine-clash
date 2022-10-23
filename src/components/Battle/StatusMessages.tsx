import Button from "@components/Button";
import { useStore } from "@store/store";

const StatusMessages = () => {
  const arenaStatus = useStore((state) => state.arenaStatus);
  const roundWinner = useStore((state) => state.roundWinner);
  const updateArenaStatus = useStore((state) => state.updateArenaStatus);
  const moveToView = useStore((state) => state.moveToView);
  const resetDrafting = useStore((state) => state.resetDrafting);

  const handleNextRoundClick = () => {
    updateArenaStatus("IDLE");
    moveToView("DRAFTING");
    resetDrafting();
  };

  return (
    <div className="mt-5 flex w-full flex-col items-center justify-center lg:mt-0">
      {arenaStatus === "WAITING_FOR_PLAYER" && (
        <>
          <p className="font-serif text-4xl text-slate-500">
            Waiting for player
          </p>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 320 512"
            width="30"
            height="48"
            className="text-slate-700 motion-safe:animate-pulse"
          >
            <path
              fill="currentColor"
              d="M137.4 374.6a32 32 0 0 0 45.3 0l128-128a32 32 0 0 0-22.7-54.7L32 192a32.1 32.1 0 0 0-22.7 54.7l128 128z"
            />
          </svg>
        </>
      )}
      {arenaStatus === "WAITING_FOR_ENEMY" && (
        <>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 320 512"
            width="30"
            height="48"
            className="text-slate-700 motion-safe:animate-pulse"
          >
            <path
              fill="currentColor"
              d="M182.6 137.4a32 32 0 0 0-45.3 0l-128 128A32 32 0 0 0 32 320.1h256a32.1 32.1 0 0 0 22.7-54.7l-128-128z"
            />
          </svg>
          <p className="font-serif text-4xl text-slate-500">
            Waiting for enemy
          </p>
        </>
      )}
      {arenaStatus === "BATTLE_FINISHED" && roundWinner === "player" && (
        <>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            width="64"
            height="64"
            className="mb-4 text-yellow-600"
          >
            <path
              fill="currentColor"
              d="M153.6 51.2C177 20.1 214.1 0 256 0s79 20.1 102.4 51.2c16-12.1 36-19.2 57.6-19.2c7.1 0 14.4 .8 21.6 2.5C482 44.7 512 84.3 512 128c0 7.1-.8 14.4-2.5 21.6C496 224 448 320 448 320H373.6l26.2-157.4c1.5-8.7-4.4-17-13.2-18.4s-17 4.4-18.4 13.2L341.1 320H272V160c0-8.8-7.2-16-16-16s-16 7.2-16 16V320H170.9L143.8 157.4c-1.5-8.7-9.7-14.6-18.4-13.2s-14.6 9.7-13.2 18.4L138.4 320H64s-48-96-61.5-170.4C.8 142.4 0 135.1 0 128c0-43.7 30-83.3 74.4-93.5C81.6 32.8 88.9 32 96 32c21.6 0 41.6 7.1 57.6 19.2zM448 448c0 35.3-28.7 64-64 64H128c-35.3 0-64-28.7-64-64V352H448v96z"
            />
          </svg>
          <p className="mb-4 font-serif text-4xl text-slate-500">You won!</p>
        </>
      )}
      {arenaStatus === "BATTLE_FINISHED" && roundWinner === "enemy" && (
        <>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 320 512"
            width="40"
            height="64"
            className="mb-4 text-red-600"
          >
            <path
              fill="currentColor"
              d="M14.5 192.7L32 0H136l32 48L80 104 200 224 160 120l80-56L208 0h80l17.5 192.7C312.3 267.3 262 332.9 192 348.5V448h80v64H160 48V448h80V348.5C58 332.9 7.7 267.3 14.5 192.7z"
            />
          </svg>
          <p className="mb-4 font-serif text-4xl text-slate-500">You lost!</p>
        </>
      )}
      {arenaStatus === "BATTLE_FINISHED" && (
        <Button onClickHandler={handleNextRoundClick}>
          Play another round
        </Button>
      )}
    </div>
  );
};

export default StatusMessages;
