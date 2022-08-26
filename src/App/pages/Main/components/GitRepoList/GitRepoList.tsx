import React from 'react';
import { Search } from '~/App/components/Search';
import { ApiData, GitRepoTile } from '../GitRepoTile';
import styles from './GitRepoList.module.scss';

export type GitRepoListProps = {
  orgName: string;
  onSubmit: (value: string) => void;
  loading?: boolean;
  dataList: ApiData[];
  getCardClickHandler: (data: ApiData) => () => void;
};

export const GIT_REPO_LIST_PLACEHOLDER = 'Введите название организации';

export const GitRepoList: React.FC<GitRepoListProps> = ({
  orgName,
  onSubmit,
  loading = false,
  dataList,
  getCardClickHandler,
}) => {
  const [input, setInput] = React.useState(orgName);

  React.useEffect(() => {
    setInput(orgName);
  }, [orgName]);

  return (
    <div className={styles.main}>
      <Search
        value={input}
        placeholder={GIT_REPO_LIST_PLACEHOLDER}
        onChange={setInput}
        onSubmit={onSubmit}
        loading={loading}
      />
      <div className={styles.list}>
        {dataList.map((data) => (
          <GitRepoTile
            key={data.id}
            apiData={data}
            onClick={getCardClickHandler(data)}
          />
        ))}
      </div>
    </div>
  );
};
