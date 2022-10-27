import { getRandomBetween } from "@utils/general";

const getHitMessage = (damage: number) => {
  let messages: Array<string> = [];

  switch (true) {
    case damage >= 200:
      messages = [
        "BARBARICALLY RENDS",
        "SAVAGELY SHREDS",
        "BRUTALLY RIPS",
        "SADISTICALLY CUTS",
        "REALLY SLAMS",
        "HORRIBLY WOUNDS",
        "DEVASTATINGLY RAMS",
      ];
      break;
    case damage >= 100 && damage < 200:
      messages = [
        "cruelly slashes",
        "savagely cuts",
        "powerfully pierces",
        "horribly tears",
        "badly bashes",
      ];
      break;
    case damage >= 50 && damage < 100:
      messages = ["slashes", "gorges", "strikes", "bashes", "beats"];
      break;
    case damage >= 20 && damage < 50:
      messages = ["strokes", "thrusts", "jabs", "pierces", "cuts"];
    case damage < 20:
      messages = [
        "barely grazes",
        "scrapes",
        "lightly cuts",
        "scratches",
        "bumps",
      ];
  }

  return messages[getRandomBetween(0, messages.length - 1)];
};

const getMissMessage = () => {
  const messages: Array<string> = [
    "hits and misses",
    "is distracted and misses",
    "fumbles and misses",
    "stumbles and falls missing completely",
  ];

  return messages[getRandomBetween(0, messages.length - 1)];
};

export const generateMessage = (
  attackerName: string,
  defenderName: string,
  damage: number,
  isBlocked: boolean,
  winner: string | undefined
) => {
  let message;

  if (isBlocked) {
    message = `${attackerName} hits but it's blocked by ${defenderName}`;
  } else if (!damage) {
    message = `${attackerName} ${getMissMessage()}`;
  } else {
    message = `${attackerName} ${getHitMessage(
      damage
    )} and deals ${damage} damage`;
  }

  if (winner) {
    message = `${attackerName} ${getHitMessage(
      damage
    )} and deals ${damage} damage killing ${defenderName}!`;
  }

  return message;
};
