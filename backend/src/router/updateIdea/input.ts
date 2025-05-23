import { z } from 'zod';

import { zCreateIdeaTrpcInput } from '../createIdea/input.js';

export const zUpdateIdeaTrpcInput = zCreateIdeaTrpcInput.extend({
  ideaId: z.string().min(1),
});
