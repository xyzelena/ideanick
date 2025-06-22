import { type inferRouterInputs, type inferRouterOutputs } from '@trpc/server';

import { trpc } from '../lib/trpc.js';

// @index('./**/index.ts', f => `import { ${f.path.split('/').slice(0, -1).pop()}TrpcRoute } from '${f.path.split('/').slice(0, -1).join('/')}'`)
import { getMeTrpcRoute } from './auth/getMe/index.js';
import { signInTrpcRoute } from './auth/signIn/index.js';
import { signUpTrpcRoute } from './auth/signUp/index.js';
import { createIdeaTrpcRoute } from './ideas/createIdea/index.js';
import { getIdeaTrpcRoute } from './ideas/getIdea/index.js';
import { getIdeasTrpcRoute } from './ideas/getIdeas/index.js';
import { updateIdeaTrpcRoute } from './ideas/updateIdea/index.js';
// @endindex

export const trpcRouter = trpc.router({
  // @index('./**/index.ts', f => `${f.path.split('/').slice(0, -1).pop()}: ${f.path.split('/').slice(0, -1).pop()}TrpcRoute,`)
  getMe: getMeTrpcRoute,
  signIn: signInTrpcRoute,
  signUp: signUpTrpcRoute,
  createIdea: createIdeaTrpcRoute,
  getIdea: getIdeaTrpcRoute,
  getIdeas: getIdeasTrpcRoute,
  updateIdea: updateIdeaTrpcRoute,
  // @endindex
});

export type TrpcRouter = typeof trpcRouter;

export type TrpcRouterInput = inferRouterInputs<TrpcRouter>;

export type TrpcRouterOutput = inferRouterOutputs<TrpcRouter>;
