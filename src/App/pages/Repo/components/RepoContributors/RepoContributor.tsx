import React from 'react';
import { Contributor } from '~/shared/GithubAPI/types';
import styles from './RepoContributor.module.scss';

export type RepoContributorProps = {
  contributor: Contributor;
};

export const RepoContributor: React.FC<RepoContributorProps> = ({
  contributor,
}) => {
  return (
    <div className={styles.main}>
      <img
        className={styles.avatar}
        src={contributor.avatar_url}
        alt="avatar"
      />
      <div className={styles.about}>
        <div className={styles.login}>{contributor.login}</div>
        {contributor.name && (
          <div className={styles.name}>{contributor.name}</div>
        )}
        <div className={styles.commits}>
          {contributor.contributions} commits
        </div>
      </div>
    </div>
  );
};
