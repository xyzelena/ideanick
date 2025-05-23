import { type z } from 'zod';
import { trpc } from '../../lib/trpc.js';

import { zCreateIdeaTrpcInput } from './input.js';

export const createIdeaTrpcRoute = trpc.procedure
  .input(zCreateIdeaTrpcInput)
  .mutation(
    async ({
      input,
      ctx,
    }: {
      input: z.infer<typeof zCreateIdeaTrpcInput>;
      ctx: { me: { id: string } | null; prisma: any };
    }) => {
      if (!ctx.me) {
        throw Error('UNAUTHORIZED');
      }

      const exIdea = await ctx.prisma.idea.findUnique({
        where: {
          nick: input.nick,
        },
      });
      if (exIdea) {
        throw Error('Idea with this nick already exists');
      }
      await ctx.prisma.idea.create({
        data: { ...input, authorId: ctx.me.id },
      });
      return true;
    }
  );
