import classNames from "classnames";
import { HeartIcon, ShieldIcon, SwordIcon } from "@components/Icons";
import { CardRarity } from "@customTypes/types";

type Props = {
  energy: number;
  carb: number;
  protein: number;
  rarity: CardRarity;
};

const RevealedStats = ({ energy, carb, protein, rarity }: Props) => {
  const isDead = !energy;

  return (
    <ul
      aria-label="Stats"
      className="z-20 mb-0 mt-auto transition-colors duration-1000"
    >
      <li
        className={classNames(
          "my-2 flex items-center",
          isDead ? "text-zinc-500" : "text-orange-500"
        )}
      >
        <HeartIcon width="24" className="mr-3 drop-shadow-md" />
        <span className="sr-only">Hitpoints:</span>
        <span className="text-lg">{energy}</span>
        <p
          className={classNames(
            "ml-auto mr-1 text-right text-sm",
            rarity === "COMMON" && "text-slate-600",
            rarity === "EPIC" && "text-purple-600",
            rarity === "LEGENDARY" && "text-yellow-600"
          )}
        >
          {rarity}
        </p>
      </li>
      <li
        className={classNames(
          "my-2 flex",
          isDead ? "text-zinc-500" : "text-lime-400"
        )}
      >
        <SwordIcon width="24" className="mr-3 drop-shadow-md" />
        <span className="sr-only">Attack:</span>
        <div
          className={classNames(
            "relative h-5 w-full rounded-lg border-b",
            rarity === "COMMON" && "border-b-slate-600 bg-slate-900",
            rarity === "EPIC" && "border-b-purple-800 bg-epic",
            rarity === "LEGENDARY" && "border-b-yellow-800 bg-legendary"
          )}
        >
          <div
            className={classNames(
              "absolute left-1 top-1 block h-3 rounded-md border-t transition-all duration-1000",
              isDead
                ? "border-t-zinc-500 bg-zinc-600"
                : "border-t-lime-100 bg-lime-400"
            )}
            style={{ width: `${Math.min(carb, 95)}%` }}
          ></div>
          <span className="absolute right-2 text-sm">{carb}</span>
        </div>
      </li>
      <li
        className={classNames(
          "my-2 flex",
          isDead ? "text-zinc-500" : "text-sky-400"
        )}
      >
        <ShieldIcon width="24" className="mr-3 drop-shadow-md" />
        <span className="sr-only">Defence:</span>
        <div
          className={classNames(
            "relative h-5 w-full rounded-lg border-b",
            rarity === "COMMON" && "border-b-slate-500 bg-slate-900",
            rarity === "EPIC" && "border-b-purple-800 bg-epic",
            rarity === "LEGENDARY" && "border-b-yellow-800 bg-legendary"
          )}
        >
          <div
            className={classNames(
              "absolute left-1 top-1 block h-3 rounded-md border-t transition-all duration-1000",
              isDead
                ? "border-t-zinc-500 bg-zinc-600"
                : "border-t-sky-100 bg-sky-400"
            )}
            style={{ width: `${Math.min(protein, 95)}%` }}
          ></div>
          <span className="absolute right-2 text-sm">{protein}</span>
        </div>
      </li>
    </ul>
  );
};

export default RevealedStats;
