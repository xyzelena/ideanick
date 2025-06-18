import { useParams } from 'react-router-dom';

import { useMe } from '../../lib/ctx';
import { type EditIdeaRouteParams } from '../../lib/routes';

import { trpc } from '../../lib/trpc';

import { EditIdeaComponent } from './EditIdeaComponent';

export const EditIdeaPage = () => {
  const { ideaNick } = useParams() as EditIdeaRouteParams;

  const me = useMe();

  const getIdeaResult = trpc.getIdea.useQuery({
    ideaNick,
  });

  if (getIdeaResult.isLoading || getIdeaResult.isFetching) {
    return <span>Loading...</span>;
  }

  if (getIdeaResult.isError) {
    return <span>Error: {getIdeaResult.error.message}</span>;
  }

  if (!getIdeaResult.data?.idea) {
    return <span>Idea not found</span>;
  }

  const idea = getIdeaResult.data.idea;

  if (!me) {
    return <span>Only for authorized</span>;
  }

  if (me.id !== idea.authorId) {
    return <span>An idea can only be edited by the author</span>;
  }

  return <EditIdeaComponent idea={idea} />;
};
