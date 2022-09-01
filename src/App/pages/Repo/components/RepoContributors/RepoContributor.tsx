import React from 'react';
import { RepoContributorModel } from '~/App/models/GitHub';
import styles from './RepoContributor.module.scss';

export type RepoContributorProps = {
  contributor: RepoContributorModel;
};

export const RepoContributor: React.FC<RepoContributorProps> = ({
  contributor,
}) => {
  return (
    <div className={styles.main}>
      <img className={styles.avatar} src={contributor.avatarUrl} alt="avatar" />
      <div className={styles.about}>
        <div className={styles.login}>{contributor.login}</div>
        {contributor.name && (
          <div className={styles.name}>{contributor.name}</div>
        )}
        <div className={styles.commits}>{contributor.commits} commits</div>
      </div>
    </div>
  );
};
