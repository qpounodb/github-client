import React from 'react';

import { WithLoader } from '~/App/components/WithLoader';
import { DataState, PropsWithChildrenAndClassname } from '~/shared/types';
import { getDisplayName, isNone, joinClassName } from '~/shared/utils';

import styles from './withRepoBlock.module.scss';

export type RepoBlockProps<T> = React.PropsWithChildren<{
  data: T;
}>;
export type RepoBlock<T> = React.FC<RepoBlockProps<T>>;

export type RepoBlockWrapperProps<T> = PropsWithChildrenAndClassname<{
  state: DataState<T>;
  title: string;
}>;
export type RepoBlockWrapper<T> = React.FC<RepoBlockWrapperProps<T>>;

const getTitles = (title: string) => ({
  loading: `${title} 👾`,
  noData: `No ${title} 😿`,
});

export const withRepoBlock = <T extends object>(
  className: string,
  RepoBlock: RepoBlock<T>
): RepoBlockWrapper<T> => {
  const RepoBlockWrapper: RepoBlockWrapper<T> = ({
    state: { loading, data },
    title,
    children,
  }: RepoBlockWrapperProps<T>) => {
    const cls = joinClassName(styles.root, className);
    const titles = getTitles(title);

    if (loading) {
      return (
        <div className={cls}>
          <WithLoader loading={loading} message={titles.loading}></WithLoader>
        </div>
      );
    }

    if (isNone(data)) {
      return (
        <div className={cls}>
          <h2>{titles.noData}</h2>
        </div>
      );
    }

    return (
      <div className={cls}>
        <RepoBlock data={data}>{children}</RepoBlock>
      </div>
    );
  };

  RepoBlockWrapper.displayName = getDisplayName('WithRepoBlock', RepoBlock);
  return React.memo(RepoBlockWrapper);
};
