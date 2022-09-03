import axios from 'axios';
import React from 'react';
import { RepoModel, RepoModelCollection } from '~/App/models/GitHub';
import { linerizeCollection } from '~/App/models/shared';
import { DataState } from '~/shared/types';
import { formatCode, isNone, isSome } from '~/shared/utils';
import { GitRepoTile } from '../GitRepoTile';
import styles from './GitRepoList.module.scss';

export type GitRepoListProps = {
  state: DataState<RepoModelCollection>;
  getCardClickHandler: (data: RepoModel) => () => void;
};

export const GitRepoList: React.FC<GitRepoListProps> = ({
  state: { error, data },
  getCardClickHandler,
}) => {
  if (isSome(error)) {
    return (
      <div className={styles.root}>
        <div>
          <p>{error.message}</p>
          {axios.isAxiosError(error) && error.response && (
            <div>
              <code>
                <pre className={styles.code}>
                  {formatCode(error.response.data)}
                </pre>
                <pre className={styles.code}>
                  {formatCode(error.response.headers)}
                </pre>
              </code>
            </div>
          )}
        </div>
      </div>
    );
  }

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
