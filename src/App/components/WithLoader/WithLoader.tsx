import React from 'react';

import { Loader } from '~components/Loader';
import type { PropsWithChildrenAndClassName } from '~types';
import { joinClassName } from '~utils';

import { default as s } from './WithLoader.module.scss';

export type WithLoaderProps = PropsWithChildrenAndClassName<{
  loading?: boolean;
  message?: string;
}>;

const WithLoader: React.FC<WithLoaderProps> = ({
  loading,
  message,
  children,
  className,
}) => {
  const info = message ? `Loading ${message}...` : 'Loading...';

  const [root, content, cover, msg] = React.useMemo(
    () => [
      joinClassName(s.root, loading && s.root_loading, className),
      joinClassName(s.root__content, loading && s.root__content_loading),
      joinClassName(s.root__cover, loading && s.root__cover_loading),
      joinClassName(s.root__message, loading && s.root__message_loading),
    ],
    [loading]
  );

  return (
    <div className={root}>
      <div className={content}>{children}</div>
      <div className={cover}>
        <div className={msg}>
          <Loader loading={loading} /> {info}
        </div>
      </div>
    </div>
  );
};

export default React.memo(WithLoader);
