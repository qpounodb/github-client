import React from 'react';

import { RepoContributorModel } from '~models/github';

import styles from './Contributor.module.scss';

export type ContributorProps = {
  contributor: RepoContributorModel;
};

const Contributor: React.FC<ContributorProps> = ({ contributor }) => {
  return (
    <div className={styles.root}>
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

export default React.memo(Contributor);
