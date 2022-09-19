import React from 'react';

import { CommitModel } from '~models/github';
import { linerizeCollection } from '~models/shared';

import { RepoBlock, RepoBlockProps, withRepoBlock } from '../withRepoBlock';

import { Stats, StatusIcon } from './components';
import styles from './RepoCommit.module.scss';

const RepoCommit: RepoBlock<CommitModel> = ({
  data,
  className,
}: RepoBlockProps<CommitModel>) => {
  const user = data.commit.author ?? data.commit.committer;
  const owner = data.author ?? data.committer;

  return (
    <div className={className}>
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
        <div className={styles.author}>
          <div className={styles.sign}>
            <span>{user.date.toDateString()}</span>
            <span>{user.name}</span>
            <span>{user.email}</span>
          </div>
          {owner && (
            <div className={styles.avatar}>
              <img src={owner.avatarUrl} alt="avatar" />
              <div>{owner.login}</div>
            </div>
          )}
        </div>
      )}

      <div className={styles.changes}>
        <h3>Changes</h3>
        <div className={styles.list}>
          {linerizeCollection(data.files).map((file, idx) => (
            <React.Fragment key={`${file.sha}:${idx}`}>
              <StatusIcon file={file} />
              <Stats stats={file} />
              <span className={styles.filename}>{file.filename}</span>
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default withRepoBlock('', RepoCommit);
