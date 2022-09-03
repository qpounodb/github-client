import React from 'react';
import { Contributor as ContributorModel } from '~/shared/GithubAPI/types';
import styles from './Contributor.module.scss';

export type ContributorProps = {
  contributor: ContributorModel;
};

export const Contributor: React.FC<ContributorProps> = ({ contributor }) => {
  return (
    <div className={styles.root}>
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
