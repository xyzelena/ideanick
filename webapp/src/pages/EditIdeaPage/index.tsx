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
  setProps: ({ queryResult, ctx, checkExists, checkAccess }) => {
    const idea = checkExists(queryResult.data.idea, 'Idea not found');
    checkAccess(
      ctx.me?.id === idea.authorId,
      'An idea can only be edited by the author'
    );
    return {
      idea,
    };
  },
})(({ idea }) => {
  return <EditIdeaComponent idea={idea} />;
});
