import { DownArrowIcon, UpArrowIcon } from "@components/Icons";
import { CardRarity } from "@customTypes/types";

type Props = {
  children: React.ReactNode;
  isNegative?: boolean;
  rarity: CardRarity;
};

const Tag: React.FC<Props> = ({ children, isNegative, rarity }) => {
  let classes =
    "mb-2 inline-flex items-center justify-center rounded-full bg-slate-800 px-3 py-1 text-xs";

  if (rarity === "LEGENDARY") {
    classes =
      "mb-2 inline-flex items-center justify-center rounded-full bg-legendary px-3 py-1 text-xs";
  } else if (rarity === "EPIC") {
    classes =
      "mb-2 inline-flex items-center justify-center rounded-full bg-epic px-3 py-1 text-xs";
  }

  return (
    <li className={classes}>
      {isNegative ? (
        <DownArrowIcon width="10" className="mr-2 text-red-500" />
      ) : (
        <UpArrowIcon width="10" className="mr-2 text-green-500" />
      )}
      {children}
    </li>
  );
};

export default Tag;
