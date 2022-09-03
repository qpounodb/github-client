import {
  IconEye,
  IconFork,
  IconIssue,
  IconRepo,
  IconStar,
} from '~/App/assets/icons';
import { Repository } from '~/shared/GithubAPI';
import { formatCount, getLangLogo } from '~/shared/utils';
import { withRepoBlock } from '../withRepoBlock';
import styles from './RepoInfo.module.scss';

export const RepoInfo = withRepoBlock<Repository>(styles.root, ({ data }) => {
  const langLogo = data.language && getLangLogo(data.language);

  return (
    <div className={styles.info}>
      <div className={styles.about}>
        <div className={styles.repo}>
          <h1 className={styles.name}>
            {data.fork ? (
              <IconFork title="Forked repo" />
            ) : (
              <IconRepo title="Source repo" />
            )}
            {data.name}
          </h1>
          {data.description && <p>{data.description}</p>}
          <div className={styles.stats}>
            <div title="Stars">
              <IconStar /> {formatCount(data.stargazers_count)}
            </div>
            <div title="Watchers">
              <IconEye /> {formatCount(data.subscribers_count)}
            </div>
            <div title="Forks">
              <IconFork /> {formatCount(data.forks_count)}
            </div>
            <div title="Open issues">
              <IconIssue /> {formatCount(data.open_issues_count)}
            </div>
          </div>
          <div className={styles.date}>
            <div>Created</div>
            <div>{new Date(data.created_at).toDateString()}</div>
            <div>Updated</div>
            <div>{new Date(data.updated_at).toDateString()}</div>
          </div>
          {data.language && langLogo && (
            <div className={styles.lang}>
              <div>
                Main language:
                <img src={langLogo} alt={data.language} title={data.language} />
                {data.language}
              </div>
            </div>
          )}
        </div>
        <div>
          <div className={styles.owner}>
            <img src={data.owner.avatar_url} alt="avatar" />
            <a
              className={styles.link}
              href={data.owner.html_url}
              target="_blank"
              rel="noopener noreferrer"
            >
              {data.owner.login}
            </a>
          </div>
        </div>
      </div>

      {data.topics.length > 0 && (
        <div className={styles.topics}>
          <h3>Topics:</h3>
          <ul>
            {data.topics.map((topic) => (
              <li key={topic}>{topic}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
});
