import classNames from "classnames";
import { HeartIcon, ShieldIcon, SwordIcon } from "@components/Icons";

type Props = {
  energy: number;
  carb: number;
  protein: number;
};

const RevealedStats = ({ energy, carb, protein }: Props) => {
  return (
    <ul aria-label="Stats" className="mb-0 mt-auto">
      <li className="my-2 flex text-orange-500">
        <HeartIcon width="24" className="mr-3 drop-shadow-md" />
        <span className="sr-only">Hitpoints:</span>
        <span className="text-lg">{energy}</span>
      </li>
      <li className="my-2 flex text-lime-400">
        <SwordIcon width="24" className="mr-3 drop-shadow-md" />
        <span className="sr-only">Attack:</span>
        <div
          className={classNames(
            "relative h-5 w-full rounded-lg border-b border-b-slate-600 bg-slate-900"
          )}
        >
          <div
            className="absolute left-1 top-1 block h-3 rounded-md border-t border-t-lime-100 bg-lime-400 transition-all"
            style={{ width: `${Math.min(carb, 95)}%` }}
          ></div>
          <span className="absolute right-2 text-sm">{carb}</span>
        </div>
      </li>
      <li className="my-2 flex text-sky-400">
        <ShieldIcon width="24" className="mr-3 drop-shadow-md" />
        <span className="sr-only">Defence:</span>
        <div
          className={classNames(
            "relative h-5 w-full rounded-lg border-b border-b-slate-500 bg-slate-900"
          )}
        >
          <div
            className="absolute left-1 top-1 block h-3 rounded-md border-t border-t-sky-100 bg-sky-400 transition-all"
            style={{ width: `${Math.min(protein, 95)}%` }}
          ></div>
          <span className="absolute right-2 text-sm">{protein}</span>
        </div>
      </li>
    </ul>
  );
};

export default RevealedStats;
