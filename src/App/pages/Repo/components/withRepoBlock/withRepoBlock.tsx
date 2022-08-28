import React from 'react';
import { WithLoader } from '~/App/components/WithLoader';
import { DataState } from '~/shared/data-state';
import {
  classname,
  isNone,
  isSome,
  PropsWithChildrenAndClassname,
} from '~/shared/utils';
import styles from './withRepoBlock.module.scss';

export type ComponentProps<T> = React.PropsWithChildren<{
  data: T;
}>;

export type RepoBlockProps<T extends object = {}> =
  PropsWithChildrenAndClassname<{
    state: DataState<T>;
    loadingMessage: string;
    noDataTitle: string;
    errorTitle: string;
  }>;

export const withRepoBlock = <T extends object>(
  className: string,
  Component: React.FC<ComponentProps<T>>
) => {
  const RepoBlock: React.FC<RepoBlockProps<T>> = ({
    state,
    loadingMessage,
    noDataTitle,
    errorTitle,
    children,
  }) => {
    const cls = classname(styles.main, className);

    if (state.loading) {
      return (
        <WithLoader
          loading={state.loading}
          message={loadingMessage}
        ></WithLoader>
      );
    }

    if (isSome(state.error)) {
      return (
        <div className={cls}>
          <h2>{errorTitle}</h2>
          <p>{state.error.message}</p>
        </div>
      );
    }

    if (isNone(state.data)) {
      return (
        <div className={cls}>
          <h2>{noDataTitle}</h2>
        </div>
      );
    }

    return (
      <div className={cls}>
        <Component data={state.data} children={children} />
      </div>
    );
  };

  return RepoBlock;
};
