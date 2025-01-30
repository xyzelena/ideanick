import { type FC } from 'react';

import css from './index.module.scss';

type SegmentProps = {
  title: React.ReactNode;
  size?: 1 | 2;
  description?: string;
  children?: React.ReactNode;
};

export const Segment: FC<SegmentProps> = ({
  title,
  size = 1,
  description,
  children,
}) => {
  return (
    <div className={css.segment}>
      {size === 1 ? (
        <h1 className={css.title}>{title}</h1>
      ) : (
        <h2 className={css.title}>{title}</h2>
      )}
      {description && <p className={css.description}>{description}</p>}

      {children && <div className={css.content}>{children}</div>}
    </div>
  );
};
