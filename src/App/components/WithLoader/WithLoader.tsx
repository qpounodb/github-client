import React from 'react';
import { Loader } from '~/App/components/Loader/Loader';
import { classname, PropsWithChildrenAndClassname } from '~/shared/utils';
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
    <div className={classname(styles.container, className)}>
      {children}
      {loading && (
        <div className={styles.cover}>
          <div className={styles.message}>
            <Loader /> {info}
          </div>
        </div>
      )}
    </div>
  );
};
