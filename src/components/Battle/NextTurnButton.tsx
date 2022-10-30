import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { useStore } from "@store/store";
import classNames from "classnames";

const NextTurnButton = () => {
  const clearTurn = useStore((state) => state.clearTurn);

  const buttonRef = useRef<HTMLButtonElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(buttonRef.current, {
        scale: 0.7,
        opacity: 0,
        delay: 0.25,
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <button
      ref={buttonRef}
      className={classNames(
        "absolute right-3 bottom-3 aspect-square rounded-full border-t-2 border-l-2 border-indigo-600 bg-gradient-to-b from-indigo-700 to-indigo-900 p-3 font-serif text-cyan-100",
        "hover:border-indigo-700 hover:bg-gradient-to-b hover:from-indigo-900 hover:to-indigo-800 hover:text-sky-200"
      )}
      onClick={clearTurn}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512 512"
        width="32"
        height="32"
      >
        <path
          fill="currentColor"
          d="M470.6 105.4a32 32 0 0 1 0 45.3l-256 256a32 32 0 0 1-45.3 0l-128-128a32 32 0 0 1 45.3-45.3L192 338.7l233.4-233.3a32 32 0 0 1 45.3 0z"
        />
      </svg>
      <span className="sr-only">Next turn</span>
    </button>
  );
};

export default NextTurnButton;
