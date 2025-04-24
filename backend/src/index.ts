import cors from 'cors';
import express from 'express';

import { type AppContext, createAppContext } from './lib/ctx.js';
import { applyTrpcToExpressApp } from './lib/trpc.js';
import { trpcRouter } from './router/index.js';

void (async () => {
  let ctx: AppContext | null = null;

  try {
    ctx = createAppContext();

    const expressApp = express();

    expressApp.use(cors());

    expressApp.get('/ping', (req, res) => {
      res.send('pong');
    });

    await applyTrpcToExpressApp(expressApp, ctx, trpcRouter);

    expressApp.listen(3000, () => {
      console.info('Listening at http://localhost:3000');
    });
  } catch (error) {
    console.error(error);
    await ctx?.stop();
  }
})();
