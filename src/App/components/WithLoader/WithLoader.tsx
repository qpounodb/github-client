import React from 'react';
import { Loader } from '~/App/components/Loader';
import { PropsWithChildrenAndClassname } from '~/shared/types';
import { joinClassName } from '~/shared/utils';
import styles from './WithLoader.module.scss';

export type WithLoaderProps = PropsWithChildrenAndClassname<{
  loading?: boolean;
  message?: string;
}>;

export const WithLoader: React.FC<WithLoaderProps> = ({
  loading,
  message,
  children,
  className,
}) => {
  const info = message ? `Loading ${message}...` : 'Loading...';

  return (
    <div
      className={joinClassName(
        styles.root,
        loading && styles.root_loading,
        className
      )}
    >
      {children}
      <div
        className={joinClassName(
          styles.root__cover,
          loading && styles.root__cover_loading
        )}
      >
        <div
          className={joinClassName(
            styles.root__message,
            loading && styles.root__message_loading
          )}
        >
          <Loader loading={loading} /> {info}
        </div>
      </div>
    </div>
  );
};
