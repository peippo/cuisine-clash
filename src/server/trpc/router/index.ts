// src/server/trpc/router/index.ts
import { t } from "@server/trpc/trpc";
import { exampleRouter } from "./example";
import { deckRouter } from "./deck";
import { authRouter } from "./auth";

export const appRouter = t.router({
  deck: deckRouter,
  example: exampleRouter,
  auth: authRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
