import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import classNames from "classnames";

type Props = {
  children: React.ReactNode;
  onClickHandler: () => void;
  isDisabled?: boolean;
  className?: string;
  isSecondary?: boolean;
};

const Button: React.FC<Props> = ({
  children,
  onClickHandler,
  isDisabled = false,
  className,
  isSecondary,
}) => {
  const buttonRef = useRef<HTMLButtonElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(buttonRef.current, {
        top: -20,
        opacity: 0,
      });
    });

    return () => ctx.revert();
  }, []);

  let baseStyles =
    "relative self-center rounded-lg border-t-2 border-l-2 border-indigo-600 bg-gradient-to-b from-indigo-700 to-indigo-900 py-2 px-8 pb-3 text-cyan-100 md:text-lg";
  let hoverStyles =
    "hover:border-indigo-700 hover:bg-gradient-to-b hover:from-indigo-900 hover:to-indigo-800 hover:text-sky-200";

  if (isSecondary) {
    baseStyles =
      "relative self-center rounded-lg border-2 border-indigo-700 py-2 px-8 pb-3 text-indigo-400 md:text-md transition-all";
    hoverStyles = "hover:border-indigo-600 hover:text-indigo-200";
  }

  return (
    <button
      ref={buttonRef}
      onClick={onClickHandler}
      disabled={isDisabled}
      className={classNames(
        baseStyles,
        hoverStyles,
        "disabled:cursor-not-allowed disabled:border-slate-600 disabled:from-slate-700 disabled:to-slate-700 disabled:text-slate-400",
        className
      )}
    >
      {children}
    </button>
  );
};

export default Button;
