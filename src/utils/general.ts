import { CardRarity } from "@customTypes/types";
import { Dish } from "@prisma/client";
import { TOTAL_DISHES } from "./constants";

export const getRandomBetween = (min: number, max: number) => {
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

export const getCardRarity = (card: Dish) => {
  let rarity: CardRarity = "COMMON";
  const hp = card.energy;
  const attack = card.carb;
  const defence = card.protein;
  const delay = attack + defence + card.fat;

  if (
    (hp > 1500 && attack > 25 && defence > 5) ||
    (hp > 900 && attack > 40 && defence > 5) ||
    attack > 65 ||
    (attack > 50 && delay < 65)
  ) {
    rarity = "LEGENDARY";
  } else if (
    (hp > 1250 && attack > 25 && delay < 50) ||
    (hp > 800 && attack > 35) ||
    attack > 60 ||
    (attack > 40 && delay < 50)
  ) {
    rarity = "EPIC";
  }

  return rarity;
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

export const mapToRange = (value: number, min: number, max: number) => {
  return (value - min) / (max - min);
};
