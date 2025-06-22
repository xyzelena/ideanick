import { useParams } from 'react-router-dom';

import { withPageWrapper } from '../../lib/pageWrapper';
import { type EditIdeaRouteParams } from '../../lib/routes';

import { trpc } from '../../lib/trpc';
import { EditIdeaComponent } from './EditIdeaComponent';

export const EditIdeaPage = withPageWrapper({
  authorizedOnly: true,
  useQuery: () => {
    const { ideaNick } = useParams() as EditIdeaRouteParams;
    return trpc.getIdea.useQuery({
      ideaNick,
    });
  },
  checkExists: ({ queryResult }) => !!queryResult.data.idea,
  checkExistsMessage: 'Idea not found',
  checkAccess: ({ queryResult, ctx }) =>
    !!ctx.me && ctx.me.id === queryResult.data.idea?.authorId,
  checkAccessMessage: 'An idea can only be edited by the author',
  setProps: ({ queryResult }) => ({
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    idea: queryResult.data.idea!,
  }),
})(({ idea }) => {
  return <EditIdeaComponent idea={idea} />;
});
