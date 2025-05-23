import { type inferRouterInputs, type inferRouterOutputs } from '@trpc/server';

import { trpc } from '../lib/trpc.js';

// @index('./**/index.ts', f => `import { ${f.path.split('/').slice(0, -1).pop()}TrpcRoute } from '${f.path.split('/').slice(0, -1).join('/')}'`)
import { createIdeaTrpcRoute } from './createIdea/index.js';
import { getIdeaTrpcRoute } from './getIdea/index.js';
import { getIdeasTrpcRoute } from './getIdeas/index.js';
import { getMeTrpcRoute } from './getMe/index.js';
import { signInTrpcRoute } from './signIn/index.js';
import { signUpTrpcRoute } from './signUp/index.js';
import { updateIdeaTrpcRoute } from './updateIdea/index.js';
// @endindex

export const trpcRouter = trpc.router({
  // @index('./**/index.ts', f => `${f.path.split('/').slice(0, -1).pop()}: ${f.path.split('/').slice(0, -1).pop()}TrpcRoute,`)
  createIdea: createIdeaTrpcRoute,
  getIdea: getIdeaTrpcRoute,
  getIdeas: getIdeasTrpcRoute,
  signIn: signInTrpcRoute,
  signUp: signUpTrpcRoute,
  getMe: getMeTrpcRoute,
  updateIdea: updateIdeaTrpcRoute,
  // @endindex
});

export type TrpcRouter = typeof trpcRouter;

export type TrpcRouterInput = inferRouterInputs<TrpcRouter>;

export type TrpcRouterOutput = inferRouterOutputs<TrpcRouter>;
