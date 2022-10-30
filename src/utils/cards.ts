import { CardRarity, CardSpeed } from "@customTypes/types";
import { Dish } from "@prisma/client";

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

export const getCardSpeed = (delay: number) => {
  let speed: CardSpeed = "STANDARD";

  switch (true) {
    case delay >= 85:
      speed = "STAGNANT";
      break;
    case delay >= 70 && delay < 85:
      speed = "SLUGGISH";
      break;
    case delay >= 50 && delay < 65:
      speed = "SLOW";
      break;
    case delay >= 15 && delay < 30:
      speed = "FAST";
      break;
    case delay <= 5 && delay < 15:
      speed = "SWIFT";
    case delay < 5:
      speed = "SUPERSONIC";
  }

  return speed;
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

export const checkIsAlcoholic = (value: number | null) =>
  value ? value >= 3 : false;
export const checkHasIron = (value: number | null) =>
  value ? value >= 3 : false;
export const checkIsSalty = (value: number | null) =>
  value ? value >= 1500 : false;
export const checkHasVitamins = (value: number | null) =>
  value ? value >= 35 : false;
