import { t } from "@server/trpc/trpc";
import { z } from "zod";
import { Dish } from "@prisma/client";
import { Battlers } from "@customTypes/types";

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
        return {
          name: card.name.split(",")[0],
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
        let damage = 0;
        let winner = undefined;
        let message;

        const isBlocked = Math.random() < stats[defender]["defence"] / 100;

        if (isBlocked) {
          message = `${stats[attacker].name} hits but it's blocked by ${stats[defender].name}`;
        } else {
          damage = stats[attacker]["attack"];
          message = `${stats[attacker].name} hits and deals ${damage} damage (${stats[defender]["hp"]} left)`;
        }

        stats[defender]["hp"] -= damage;

        if (stats[defender]["hp"] <= 0) {
          message = `${stats[attacker].name} hits and deals ${damage} damage killing ${stats[defender].name}!`;
          winner = attacker;
        }

        const roundData = {
          round: round,
          actor: attacker,
          damage: damage,
          message: message,
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
