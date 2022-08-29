import React from 'react';
import { Commit } from '~/shared/GithubAPI';
import { withRepoBlock } from '../withRepoBlock';
import styles from './RepoCommit.module.scss';
import { Stats } from './Stats';
import { StatusIcon } from './StatusIcon';

export const RepoCommit = withRepoBlock<Commit>('', ({ data }) => {
  const user = data.commit.author ?? data.commit.committer;
  const owner = data.author ?? data.committer;

  return (
    <>
      <h2 className={styles.title}>
        Last Commit
        <sup>
          <Stats stats={data.stats} />
        </sup>
      </h2>

      <div className={styles.commit}>
        <p>{data.commit.message}</p>
      </div>

      {user && (
        <div className={styles.autor}>
          <div className={styles.sign}>
            <span>{new Date(user.date).toDateString()}</span>
            <span>{user.name}</span>
            <span>{user.email}</span>
          </div>
          {owner && (
            <div className={styles.avatar}>
              <img src={owner.avatar_url} alt="avatar" />
              <div>{owner.login}</div>
            </div>
          )}
        </div>
      )}

      <div className={styles.changes}>
        <h3>Changes</h3>
        <div className={styles.list}>
          {data.files.map((file) => (
            <React.Fragment key={file.sha}>
              <StatusIcon file={file} />
              <Stats stats={file} />
              <span className={styles.filename}>{file.filename}</span>
            </React.Fragment>
          ))}
        </div>
      </div>
    </>
  );
});
