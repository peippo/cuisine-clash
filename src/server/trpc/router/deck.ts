import { t } from "@server/trpc/trpc";
import { z } from "zod";
import { getArrayOfRandomIds } from "@utils/general";

export const deckRouter = t.router({
  drawCards: t.procedure.input(z.number()).query(({ ctx, input }) => {
    return ctx.prisma.dish.findMany({
      where: {
        id: { in: getArrayOfRandomIds(input) },
      },
    });
  }),
});
