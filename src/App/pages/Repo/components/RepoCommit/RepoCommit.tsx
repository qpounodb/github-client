import React from 'react';
import { Commit } from '~/shared/GithubAPI';
import { isNone, Nullable } from '~/shared/utils';
import styles from './RepoCommit.module.scss';
import { Stats } from './Stats';
import { StatusIcon } from './StatusIcon';

export type RepoCommitProps = {
  data: Nullable<Commit>;
};

export const RepoCommit: React.FC<RepoCommitProps> = ({ data }) => {
  if (isNone(data)) return null;

  return (
    <div className={styles.main}>
      <h2 className={styles.title}>
        Last Commit
        <sup>
          <Stats stats={data.stats} />
        </sup>
      </h2>

      <div className={styles.commit}>
        <p>{data.commit.message}</p>
      </div>

      <div className={styles.autor}>
        <div className={styles.sign}>
          <span>{new Date(data.commit.author.date).toDateString()}</span>
          <span>{data.commit.author.name}</span>
          <span>{data.commit.author.email}</span>
        </div>
        <div className={styles.avatar}>
          <img src={data.author.avatar_url} alt="avatar" />
          <div>{data.author.login}</div>
        </div>
      </div>

      <div className={styles.changes}>
        <h3>Changes</h3>
        {data.files.map((file) => (
          <div className={styles.list}>
            <StatusIcon file={file} />
            <Stats stats={file} />
            {file.filename}
          </div>
        ))}
      </div>
    </div>
  );
};
