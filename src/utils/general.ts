import { TOTAL_DISHES } from "./constants";

const getRandomBetween = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

export const getArrayOfRandomIds = (
  count: number,
  excludeIds: number[] = []
) => {
  const randomIds: Array<number> = [];

  while (randomIds.length !== count) {
    const randomId = getRandomBetween(0, TOTAL_DISHES);

    if (!randomIds.includes(randomId) && !excludeIds.includes(randomId)) {
      randomIds.push(randomId);
    }
  }

  return randomIds;
};

export const getCardRotation = ({
  index,
  totalCards,
  upsideDown = false,
}: {
  index: number;
  totalCards: number;
  upsideDown?: boolean;
}) => {
  const middle = totalCards % 1 ? totalCards / 2 : Math.ceil(totalCards / 2);
  const distance = Math.abs(middle - index);

  if (upsideDown) {
    return index < middle
      ? `${Math.abs(distance) * 4}deg`
      : `${-Math.abs(distance) * 4}deg`;
  } else {
    return index < middle
      ? `${-Math.abs(distance) * 4}deg`
      : `${Math.abs(distance) * 4}deg`;
  }
};

export const randomInt = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
