import React from 'react';
import { WithLoader } from '~/App/components/WithLoader';
import {
  classname,
  isNone,
  Nullable,
  PropsWithChildrenAndClassname,
} from '~/shared/utils';
import styles from './withRepoBlock.module.scss';

export type ComponentProps<T> = React.PropsWithChildren<{
  data: T;
}>;

export type RepoBlockProps<T extends unknown = unknown> =
  PropsWithChildrenAndClassname<{
    data: Nullable<T> | Error;
    loading: boolean;
    loadingMessage: string;
    noDataTitle: string;
    errorTitle: string;
  }>;

export const withRepoBlock = <T extends object>(
  className: string,
  Component: React.FC<ComponentProps<T>>
) => {
  const RepoBlock: React.FC<RepoBlockProps<T>> = ({
    data,
    loading,
    loadingMessage,
    noDataTitle,
    errorTitle,
    children,
  }) => {
    const cls = classname(styles.main, className);

    if (loading) {
      return (
        <WithLoader loading={loading} message={loadingMessage}></WithLoader>
      );
    }

    if (isNone(data)) {
      return (
        <div className={cls}>
          <h2>{noDataTitle}</h2>
        </div>
      );
    }

    if (data instanceof Error) {
      return (
        <div className={cls}>
          <h2>{errorTitle}</h2>
          <p>{data.message}</p>
        </div>
      );
    }

    return (
      <div className={cls}>
        <Component data={data} children={children} />
      </div>
    );
  };

  return RepoBlock;
};
