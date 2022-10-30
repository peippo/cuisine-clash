import { DownArrowIcon, UpArrowIcon } from "@components/Icons";

type Props = {
  children: React.ReactNode;
  isNegative?: boolean;
};

const Tag: React.FC<Props> = ({ children, isNegative }) => {
  return (
    <li className="mb-2 inline-flex items-center justify-center rounded-full bg-slate-800 px-3 py-1 text-xs">
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
