import {
  IconEye,
  IconFork,
  IconIssue,
  IconRepo,
  IconStar,
} from '~/App/assets/icons';
import { RepoModel } from '~/App/models/github';
import { formatCount, getLangLogo } from '~/shared/utils';

import { RepoBlock, RepoBlockProps, withRepoBlock } from '../withRepoBlock';

import styles from './RepoInfo.module.scss';

const RepoInfo: RepoBlock<RepoModel> = ({
  data,
}: RepoBlockProps<RepoModel>) => {
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
              <IconStar /> {formatCount(data.stargazersCount)}
            </div>
            <div title="Watchers">
              <IconEye /> {formatCount(data.subscribersCount)}
            </div>
            <div title="Forks">
              <IconFork /> {formatCount(data.forksCount)}
            </div>
            <div title="Open issues">
              <IconIssue /> {formatCount(data.openIssuesCount)}
            </div>
          </div>
          <div className={styles.date}>
            <div>Created</div>
            <div>{data.createdAt.toDateString()}</div>
            <div>Updated</div>
            <div>{data.updatedAt.toDateString()}</div>
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
            <img src={data.owner.avatarUrl} alt="avatar" />
            <a
              className={styles.link}
              href={data.owner.htmlUrl}
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
};

export default withRepoBlock(styles.root, RepoInfo);
