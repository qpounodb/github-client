import React from 'react';
import {
  IconEye,
  IconFork,
  IconIssue,
  IconRepo,
  IconStar,
} from '~/App/assets/icons';
import { Repository } from '~/shared/GithubAPI';
import { formatCount, getLangLogo, isNone, Nullable } from '~/shared/utils';
import styles from './RepoInfo.module.scss';

export type RepoInfoProps = {
  info: Nullable<Repository>;
};

export const RepoInfo: React.FC<RepoInfoProps> = ({ info }) => {
  if (isNone(info)) return null;

  const langLogo = info.language && getLangLogo(info.language);

  return (
    <div className={styles.main}>
      <div className={styles.about}>
        <div className={styles.repo}>
          <h1 className={styles.name}>
            {info.fork ? (
              <IconFork title="Forked repo" />
            ) : (
              <IconRepo title="Source repo" />
            )}
            {info.name}
          </h1>
          {info.description && <p>{info.description}</p>}
          <div className={styles.stats}>
            <div title="Stars">
              <IconStar /> {formatCount(info.stargazers_count)}
            </div>
            <div title="Watchers">
              <IconEye /> {formatCount(info.subscribers_count)}
            </div>
            <div title="Forks">
              <IconFork /> {formatCount(info.forks_count)}
            </div>
            <div title="Open issues">
              <IconIssue /> {formatCount(info.open_issues_count)}
            </div>
          </div>
          <div className={styles.date}>
            <div>Created</div>
            <div>{new Date(info.created_at).toDateString()}</div>
            <div>Updated</div>
            <div>{new Date(info.updated_at).toDateString()}</div>
          </div>
          {info.language && langLogo && (
            <div className={styles.lang}>
              <div>
                Main language:
                <img src={langLogo} alt={info.language} title={info.language} />
                {info.language}
              </div>
            </div>
          )}
        </div>
        <div>
          <div className={styles.owner}>
            <img src={info.owner.avatar_url} alt="avatar" />
            <a
              className={styles.link}
              href={info.owner.html_url}
              target="_blank"
              rel="noopener noreferrer"
            >
              {info.owner.login}
            </a>
          </div>
        </div>
      </div>

      {info.topics.length > 0 && (
        <div className={styles.topics}>
          <h3>Topics:</h3>
          <ul>
            {info.topics.map((topic) => (
              <li key={topic}>{topic}</li>
            ))}
          </ul>
        </div>
      )}

      {/* <code>
              <pre>{JSON.stringify(info, null, 4)}</pre>
            </code> */}
    </div>
  );
};
