import React from 'react';

import type { PropsWithChildrenAndClassName } from '~types';
import { getDisplayName, isNone, joinClassName } from '~utils';

import styles from './withRepoBlock.module.scss';

export type RepoBlockProps<T> = PropsWithChildrenAndClassName<{
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
    if (isNone(data)) {
      return null;
    }

    return (
      <RepoBlock data={data} className={joinClassName(styles.root, className)}>
        {children}
      </RepoBlock>
    );
  };

  RepoBlockWrapper.displayName = getDisplayName('WithRepoBlock', RepoBlock);

  return React.memo(RepoBlockWrapper);
};
