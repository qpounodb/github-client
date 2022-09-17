import React from 'react';

import { RepoModel, RepoModelCollection } from '~models/github';
import { linerizeCollection } from '~models/shared';
import type { Nullable } from '~types';
import { isNone } from '~utils';

import { GitRepoTile } from '../GitRepoTile';

import styles from './GitRepoList.module.scss';

export type GitRepoListProps = {
  data: Nullable<RepoModelCollection>;
  getCardClickHandler: (data: RepoModel) => () => void;
};

const GitRepoList: React.FC<GitRepoListProps> = ({
  data,
  getCardClickHandler,
}) => {
  if (isNone(data)) {
    return null;
  }

  return (
    <div className={styles.root}>
      <div className={styles.list}>
        {linerizeCollection(data).map((data) => (
          <GitRepoTile
            key={data.id}
            data={data}
            onClick={getCardClickHandler(data)}
          />
        ))}
      </div>
    </div>
  );
};

export default React.memo(GitRepoList);
