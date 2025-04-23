import { type AppContext } from '../../lib/ctx.js';
import { trpc } from '../../lib/trpc.js';

export const getIdeasTrpcRoute = trpc.procedure.query(
  async ({ ctx }: { ctx: AppContext }) => {
    const ideas = await ctx.prisma.idea.findMany({
      select: {
        id: true,
        nick: true,
        name: true,
        description: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return { ideas };
  }
);
