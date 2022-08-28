import axios from 'axios';
import React from 'react';
import { Search } from '~/App/components/Search';
import { formatCode, isSome, Nullable } from '~/shared/utils';
import { ApiData, GitRepoTile } from '../GitRepoTile';
import styles from './GitRepoList.module.scss';
export type GitRepoListProps = {
  orgName: string;
  onSubmit: (value: string) => void;
  loading: boolean;
  error: Nullable<Error>;
  dataList: ApiData[];
  getCardClickHandler: (data: ApiData) => () => void;
};

export const GIT_REPO_LIST_PLACEHOLDER = 'Введите название организации';

export const GitRepoList: React.FC<GitRepoListProps> = ({
  orgName,
  onSubmit,
  loading,
  error,
  dataList,
  getCardClickHandler,
}) => {
  const [input, setInput] = React.useState(orgName);

  React.useEffect(() => {
    setInput(orgName);
  }, [orgName]);

  const content = isSome(error) ? (
    <div>
      <p>{error.message}</p>
      {axios.isAxiosError(error) && error.response && (
        <div>
          <code>
            <pre className={styles.code}>{formatCode(error.response.data)}</pre>
            <pre className={styles.code}>
              {formatCode(error.response.headers)}
            </pre>
          </code>
        </div>
      )}
    </div>
  ) : (
    <div className={styles.list}>
      {dataList.map((data) => (
        <GitRepoTile
          key={data.id}
          apiData={data}
          onClick={getCardClickHandler(data)}
        />
      ))}
    </div>
  );

  return (
    <div className={styles.main}>
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
