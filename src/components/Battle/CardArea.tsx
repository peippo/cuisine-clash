import { Battlers } from "@customTypes/types";
import classNames from "classnames";

type Props = {
  children: React.ReactNode;
  actor: Battlers;
};

const CardArea: React.FC<Props> = ({ children, actor }) => {
  return (
    <div
      className={classNames(
        "relative h-80 w-60 min-w-[15rem] rounded-2xl border-4 border-dotted border-slate-800 bg-slate-1000",
        actor === "player" ? "order-1" : "order-2 lg:order-3"
      )}
    >
      <span className="absolute -top-9 uppercase text-slate-600">{actor}</span>
      <div className="absolute top-0 left-0">{children}</div>
    </div>
  );
};

export default CardArea;
