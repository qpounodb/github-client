import React from 'react';
import { Contributor } from '~/shared/GithubAPI/types';
import { isNone, Nullable } from '~/shared/utils';
import { RepoContributor } from './RepoContributor';
import styles from './RepoContributors.module.scss';

export type RepoContributorsProps = {
  data: Nullable<Contributor[]>;
};

export const RepoContributors: React.FC<RepoContributorsProps> = ({ data }) => {
  if (isNone(data)) return null;

  return (
    <div className={styles.main}>
      <h2>Top 10 Contributors</h2>
      <div className={styles.list}>
        {data.map((c) => (
          <RepoContributor key={c.id} contributor={c} />
        ))}
      </div>
    </div>
  );
};
