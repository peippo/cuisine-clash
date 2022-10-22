import { useStore } from "@store/store";

const StatusMessages = () => {
  const arenaStatus = useStore((state) => state.arenaStatus);

  return (
    <div className="flex w-full flex-col items-center justify-center">
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
            className="animate-pulse text-slate-700"
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
            className="animate-pulse text-slate-700"
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
    </div>
  );
};

export default StatusMessages;
