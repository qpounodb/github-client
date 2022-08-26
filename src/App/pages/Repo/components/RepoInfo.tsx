import React from 'react';
import { Repository } from '~/shared/GithubAPI';
import styles from './RepoInfo.module.scss';

const getLangLogo = (name: string) => {
  const lang = name
    .toLocaleLowerCase()
    .replaceAll('+', 'plus')
    .replaceAll('#', 'sharp');
  return `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${lang}/${lang}-original.svg`;
};

export const RepoInfo: React.FC<{ info: Repository }> = ({ info }) => {
  const langLogo = info.language && getLangLogo(info.language);

  return (
    <div className={styles.main}>
      <div className={styles.about}>
        <div className={styles.repo}>
          <h1 className={styles.name}>
            {info.name}
            <sup>{info.fork ? '🔱' : '🗿'}</sup>
          </h1>
          {info.description && <p>{info.description}</p>}
          <div className={styles.stats}>
            <div>🌟 {info.stargazers_count}</div>
            <div>👁️ {info.watchers_count}</div>
            <div>🔱 {info.forks_count}</div>
            <div>❓ {info.open_issues_count}</div>
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
