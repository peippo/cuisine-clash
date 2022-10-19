// src/server/trpc/router/index.ts
import { t } from "@server/trpc/trpc";
import { deckRouter } from "./deck";
import { battleRouter } from "./battle";
import { authRouter } from "./auth";

export const appRouter = t.router({
  deck: deckRouter,
  auth: authRouter,
  battle: battleRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
