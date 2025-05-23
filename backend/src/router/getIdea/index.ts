import { z } from 'zod';
import { type AppContext } from '../../lib/ctx.js';
import { trpc } from '../../lib/trpc.js';

export const getIdeaTrpcRoute = trpc.procedure
  .input(
    z.object({
      ideaNick: z.string(),
    })
  )
  .query(
    async ({
      ctx,
      input,
    }: {
      ctx: AppContext;
      input: { ideaNick: string };
    }) => {
      const idea = await ctx.prisma.idea.findUnique({
        where: {
          nick: input.ideaNick,
        },
        include: {
          author: {
            select: {
              id: true,
              nick: true,
            },
          },
        },
      });

      return { idea };
    }
  );
