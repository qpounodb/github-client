import React from 'react';

import type { PropsWithChildrenAndClassName } from '~types';
import { getDisplayName, isNone, joinClassName } from '~utils';

import styles from './withRepoBlock.module.scss';

export type RepoBlockProps<T> = React.PropsWithChildren<{
  data: T;
}>;
export type RepoBlock<T> = React.FC<RepoBlockProps<T>>;

export type RepoBlockWrapperProps<T> = PropsWithChildrenAndClassName<{
  data?: T | null;
}>;
export type RepoBlockWrapper<T> = React.FC<RepoBlockWrapperProps<T>>;

export const withRepoBlock = <T extends object | string>(
  className: string,
  RepoBlock: RepoBlock<T>
): RepoBlockWrapper<T> => {
  const RepoBlockWrapper: RepoBlockWrapper<T> = ({
    data,
    children,
  }: RepoBlockWrapperProps<T>) => {
    const cls = joinClassName(styles.root, className);

    if (isNone(data)) {
      return null;
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
