import axios from 'axios';
import React from 'react';
import { Search } from '~/App/components/Search';
import { DataState } from '~/shared/data-state';
import { Repository } from '~/shared/GithubAPI';
import { formatCode, isNone, isSome } from '~/shared/utils';
import { GitRepoTile } from '../GitRepoTile';
import styles from './GitRepoList.module.scss';

export type GitRepoListProps = {
  state: DataState<Repository[]>;
  orgName: string;
  onSubmit: (value: string) => void;
  getCardClickHandler: (data: Repository) => () => void;
};

export const GIT_REPO_LIST_PLACEHOLDER = 'Введите название организации';

export const GitRepoList: React.FC<GitRepoListProps> = ({
  state: { error, data, loading },
  orgName,
  onSubmit,
  getCardClickHandler,
}) => {
  const [input, setInput] = React.useState(orgName);

  React.useEffect(() => {
    setInput(orgName);
  }, [orgName]);

  let content: JSX.Element | null = null;

  if (isSome(error)) {
    content = (
      <div>
        <p>{error.message}</p>
        {axios.isAxiosError(error) && error.response && (
          <div>
            <code>
              <pre className={styles.code}>
                {formatCode(error.response.data)}
              </pre>
              <pre className={styles.code}>
                {formatCode(error.response.headers)}
              </pre>
            </code>
          </div>
        )}
      </div>
    );
  } else if (isNone(data)) {
    content = orgName ? (
      <p className={styles.note}>
        🙈 No repositories or organisation <b>{orgName}</b> not found
      </p>
    ) : null;
  } else {
    content = (
      <div className={styles.list}>
        {data.map((data) => (
          <GitRepoTile
            key={data.id}
            data={data}
            onClick={getCardClickHandler(data)}
          />
        ))}
      </div>
    );
  }

  return (
    <div className={styles.root}>
      <Search
        value={input}
        placeholder={GIT_REPO_LIST_PLACEHOLDER}
        onChange={setInput}
        onSubmit={onSubmit}
        loading={loading}
      />
      {content}
    </div>
  );
};
