import { initTRPC } from '@trpc/server';
import * as trpcExpress from '@trpc/server/adapters/express';
import { type Express } from 'express';
import superjson from 'superjson';
import { expressHandler } from 'trpc-playground/handlers/express';

import { type TrpcRouter } from '../router/index.js';
import { type AppContext } from './ctx.js';

export const trpc = initTRPC.context<AppContext>().create({
  transformer: superjson,
});

export const applyTrpcToExpressApp = async (
  expressApp: Express,
  appContext: AppContext,
  trpcRouter: TrpcRouter
) => {
  expressApp.use(
    '/trpc',
    trpcExpress.createExpressMiddleware({
      createContext: () => appContext,
      router: trpcRouter,
    })
  );

  expressApp.use(
    '/trpc-playground',
    await expressHandler({
      trpcApiEndpoint: '/trpc',
      playgroundEndpoint: '/trpc-playground',
      router: trpcRouter,
      request: {
        superjson: true,
      },
    })
  );
};
