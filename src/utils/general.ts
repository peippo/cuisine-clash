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
