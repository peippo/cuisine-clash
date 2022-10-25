import { useState, useEffect, useRef } from "react";
import { mapToRange } from "@utils/general";

type Variables = {
  x: string;
  y: string;
  rX: string;
  rY: string;
  bgX: string;
  bgY: string;
};

const useCardVariables = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [variables, setVariables] = useState<Variables>({
    x: "50%",
    y: "50%",
    rX: "0deg",
    rY: "0deg",
    bgX: "50%",
    bgY: "50%",
  });

  const ref = useRef<HTMLElement>(null);

  const handleMouseOver = () => setIsHovered(true);
  const handleMouseOut = () => setIsHovered(false);
  const updateVariables = (event: MouseEvent) => {
    const elementRect = ref.current?.getBoundingClientRect() as DOMRect;

    const max = {
      x: elementRect.width,
      y: elementRect.height,
    };

    const x = mapToRange(event.clientX - elementRect.left, 0, max.x);
    const y = mapToRange(event.clientY - elementRect.top, 0, max.y);

    const rX = -(x - 0.5) * 10;
    const rY = (y - 0.5) * 10;

    const bgX = 40 + 20 * x;
    const bgY = 40 + 20 * y;

    setVariables({
      x: `${x * 100}%`,
      y: `${y * 100}%`,
      rX: `${rX}deg`,
      rY: `${rY}deg`,
      bgX: `${bgX}%`,
      bgY: `${bgY}%`,
    });
  };

  useEffect(() => {
    if (ref.current) {
      ref.current.addEventListener("mouseover", handleMouseOver);
      ref.current.addEventListener("mouseout", handleMouseOut);

      return () => {
        ref.current?.removeEventListener("mouseover", handleMouseOver);
        ref.current?.removeEventListener("mouseout", handleMouseOut);
      };
    }
  }, [ref.current]);

  useEffect(() => {
    if (isHovered) {
      window.addEventListener("mousemove", updateVariables);
    }

    return () => {
      window.removeEventListener("mousemove", updateVariables);
    };
  }, [isHovered]);

  return { ref, variables };
};

export default useCardVariables;
