import classNames from "classnames";

type Props = {
  children: React.ReactNode;
  onClickHandler: () => void;
};

const Button: React.FC<Props> = ({ children, onClickHandler }) => {
  return (
    <button
      onClick={onClickHandler}
      className={classNames(
        "relative mt-6 self-center rounded-xl border-t-2 border-l-2 border-indigo-600 bg-gradient-to-b from-indigo-700 to-indigo-900 py-3 px-8 font-serif text-xl text-cyan-100",
        "disabled:border-slate-600 disabled:from-slate-700 disabled:to-slate-700 disabled:text-slate-400",
        "hover:border-indigo-700 hover:bg-gradient-to-b hover:from-indigo-900 hover:to-indigo-800 hover:text-sky-200"
      )}
    >
      {children}
    </button>
  );
};

export default Button;
