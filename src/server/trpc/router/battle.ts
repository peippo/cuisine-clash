import { t } from "@server/trpc/trpc";
import { z } from "zod";
import { Dish } from "@prisma/client";
import { Battlers } from "@customTypes/types";
import { generateMessage } from "@utils/battle";

export const battleRouter = t.router({
  solve: t.procedure
    .input(
      z.object({
        playerCard: z.object({
          id: z.number(),
          name: z.string(),
          energy: z.number(),
          fat: z.number(),
          carb: z.number(),
          protein: z.number(),
          alcohol: z.number().nullable(),
          iron: z.number().nullable(),
          salt: z.number().nullable(),
          vitaminc: z.number().nullable(),
          rarity: z.string().nullable(),
        }),
        enemyCard: z.object({
          id: z.number(),
          name: z.string(),
          energy: z.number(),
          fat: z.number(),
          carb: z.number(),
          protein: z.number(),
          alcohol: z.number().nullable(),
          iron: z.number().nullable(),
          salt: z.number().nullable(),
          vitaminc: z.number().nullable(),
          rarity: z.string().nullable(),
        }),
      })
    )
    .query(({ input }) => {
      let round = 1;
      let successiveTurns = 1;
      let stats = null;
      const battlers = ["player", "enemy"] as Battlers[];
      const rounds = [];

      const getStats = (card: Dish) => {
        const nameFirstPart = card.name.split(",")[0] as string;

        return {
          name: nameFirstPart,
          shortName: nameFirstPart.split(" ")[0] as string,
          hp: card.energy,
          attack: card.carb * 5,
          defence: card.protein,
          delay: card.carb + card.protein + card.fat,
          isAlcoholic: card.alcohol ? card.alcohol >= 3 : false,
          hasIron: card.iron ? card.iron >= 5 : false,
          isSalty: card.salt ? card.salt >= 2000 : false,
          hasVitamins: card.vitaminc ? card.vitaminc >= 40 : false,
        };
      };

      stats = {
        player: {
          ...getStats(input.playerCard),
        },
        enemy: {
          ...getStats(input.enemyCard),
        },
      };

      const slowerBattler =
        stats.enemy.delay > stats.player.delay ? "player" : "enemy";

      slowerBattler === "enemy" && battlers.reverse();

      const higherDelay = Math.max(stats.player.delay, stats.enemy.delay);
      const lowerDelay = Math.min(stats.player.delay, stats.enemy.delay);

      let delayFactor = Math.max(higherDelay, 1) / Math.max(lowerDelay, 1);
      delayFactor = Math.round(delayFactor);

      while (stats.player.hp > 0 && stats.enemy.hp > 0) {
        const attacker = battlers[0] as Battlers;
        const defender = battlers[1] as Battlers;
        let winner = undefined;

        const isBlocked = Math.random() < stats[defender]["defence"] / 100;
        const damage = isBlocked ? 0 : stats[attacker]["attack"];

        stats[defender]["hp"] -= damage;

        if (stats[defender]["hp"] <= 0) {
          winner = attacker;
        }

        const roundData = {
          round: round,
          actor: attacker,
          damage: damage,
          message: generateMessage(
            stats[attacker].name,
            stats[defender].name,
            stats[defender].shortName,
            damage,
            isBlocked,
            winner
          ),
          isBlocked: isBlocked,
          winner: winner,
        };

        rounds.push(roundData);

        if (!delayFactor) {
          battlers.reverse();
        } else {
          if (attacker === slowerBattler) {
            if (successiveTurns < delayFactor) {
              successiveTurns += 1;
            } else {
              battlers.reverse();
              successiveTurns = 1;
            }
          } else {
            battlers.reverse();
          }
        }

        round += 1;
      }

      return rounds;
    }),
});
