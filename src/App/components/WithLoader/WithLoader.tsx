import React from 'react';
import { Loader } from '~/App/components/Loader/Loader';
import { classname, PropsWithClassName } from '~/shared/utils';
import styles from './WithLoader.module.scss';

export type WithLoaderProps = React.PropsWithChildren<
  PropsWithClassName<{
    loading?: boolean;
  }>
>;

export const WithLoader: React.FC<WithLoaderProps> = ({
  loading,
  children,
  className,
}) => (
  <div className={classname(styles.container, className)}>
    {children}
    {loading && (
      <div className={styles.cover}>
        <Loader />
      </div>
    )}
  </div>
);
