import classNames from "classnames";

type Props = {
  children: React.ReactNode;
  onClickHandler: () => void;
  isDisabled?: boolean;
  className?: string;
};

const Button: React.FC<Props> = ({
  children,
  onClickHandler,
  isDisabled = false,
  className,
}) => {
  return (
    <button
      onClick={onClickHandler}
      disabled={isDisabled}
      className={classNames(
        "relative self-center rounded-lg border-t-2 border-l-2 border-indigo-600 bg-gradient-to-b from-indigo-700 to-indigo-900 py-2 px-8 pb-3 text-cyan-100 md:text-xl",
        "disabled:cursor-not-allowed disabled:border-slate-600 disabled:from-slate-700 disabled:to-slate-700 disabled:text-slate-400",
        "hover:border-indigo-700 hover:bg-gradient-to-b hover:from-indigo-900 hover:to-indigo-800 hover:text-sky-200",
        className
      )}
    >
      {children}
    </button>
  );
};

export default Button;
