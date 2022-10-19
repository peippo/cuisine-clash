import { useBattleStore } from "@store/store";

const StatusMessages = () => {
  const turn = useBattleStore((state) => state.turn);

  return (
    <div className="flex flex-col">
      <p>{turn?.message}</p>
    </div>
  );
};

export default StatusMessages;
