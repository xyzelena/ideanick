import { format } from 'date-fns';
import { useParams } from 'react-router-dom';

import { Segment } from '../../components/Segment';
import { type ViewIdeaRouteParams } from '../../lib/routes';
import { trpc } from '../../lib/trpc';

import css from './index.module.scss';

export const ViewIdeaPage = () => {
  const { ideaNick } = useParams() as ViewIdeaRouteParams;

  const { data, error, isLoading, isFetching, isError } = trpc.getIdea.useQuery(
    {
      ideaNick,
    }
  );

  if (isLoading || isFetching) {
    return <span>Loading...</span>;
  }

  if (isError || !data) {
    return <span>Error: {error?.message || 'Failed to load idea'}</span>;
  }

  if (!data.idea) {
    return <span>Idea not found</span>;
  }

  const { idea } = data;

  return (
    <Segment title={idea.name} description={idea.description}>
      <div className={css.createdAt}>
        Created At: {format(idea.createdAt, 'yyyy-MM-dd')}
      </div>

      <div
        className={css.text}
        dangerouslySetInnerHTML={{ __html: idea.text }}
      />
    </Segment>
  );
};
