import { t } from "@server/trpc/trpc";
import { z } from "zod";
import { Dish } from "@prisma/client";
import { Battlers } from "@customTypes/types";
import { generateMessage } from "@utils/battle";
import { getRandomBetween } from "@utils/general";
import {
  checkIsAlcoholic,
  checkHasIron,
  checkIsSalty,
  checkHasVitamins,
} from "@utils/cards";

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
          isAlcoholic: checkIsAlcoholic(card.alcohol),
          hasIron: checkHasIron(card.iron),
          isSalty: checkIsSalty(card.salt),
          hasVitamins: checkHasVitamins(card.vitaminc),
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

      // Generate turn data until one side is dead
      while (stats.player.hp > 0 && stats.enemy.hp > 0) {
        const attacker = battlers[0] as Battlers;
        const defender = battlers[1] as Battlers;
        let winner = undefined;
        let damage = 0;

        // Randomize damage
        let modifierRange = { min: -5, max: 5 };

        // Negative damage on certain conditions
        if (stats[attacker]["isAlcoholic"] || stats[attacker]["isSalty"]) {
          modifierRange = { min: -15, max: 0 };
        }

        // Positive damage on certain conditions
        if (stats[attacker]["hasIron"] || stats[attacker]["hasVitamins"]) {
          modifierRange = { min: 0, max: 15 };
        }

        const isBlocked = Math.random() < stats[defender]["defence"] / 100;

        if (!isBlocked) {
          const modifierPercentage = getRandomBetween(
            modifierRange.min,
            modifierRange.max
          );

          const randomizedDamage =
            stats[attacker]["attack"] * (1 + modifierPercentage / 100);

          damage = Math.max(Math.floor(randomizedDamage), 0);
        }

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

        // Set currently active side based on delay factor
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
