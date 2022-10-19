import { t } from "@server/trpc/trpc";
import { z } from "zod";
import { Dish } from "@prisma/client";
import { Battlers } from "@customTypes/types";

export const battleRouter = t.router({
  solve: t.procedure
    .input(
      z.object({
        playerId: z.number({ required_error: "Player ID required" }),
        enemyId: z.number({ required_error: "Enemy ID required" }),
      })
    )
    .query(async ({ ctx, input }) => {
      const cards = await ctx.prisma.dish.findMany({
        where: {
          id: {
            in: [input.playerId, input.enemyId],
          },
        },
      });

      const playerCard = cards.find((card) => card.id === input.playerId);
      const enemyCard = cards.find((card) => card.id === input.enemyId);

      if (!playerCard || !enemyCard) return;

      let isEnemyStarting = false; // TODO: get from input

      let round = 1;
      let stats = null;
      const battlers = ["player", "enemy"] as Battlers[];
      const rounds = [];

      if (isEnemyStarting) {
        battlers.reverse();
      }

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
          ...getStats(playerCard),
        },
        enemy: {
          ...getStats(enemyCard),
        },
      };

      while (stats.player.hp > 0 && stats.enemy.hp > 0) {
        const attacker = battlers[0]!;
        const defender = battlers[1]!;
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
        round += 1;
        battlers.reverse();
      }

      return rounds;
    }),
});
