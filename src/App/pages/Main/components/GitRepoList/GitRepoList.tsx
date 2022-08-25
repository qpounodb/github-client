import React from 'react';
import { Search } from '~/App/components/Search';
import { ApiData, GitRepoTile } from '../GitRepoTile';
import styles from './GitRepoList.module.scss';

export type GitRepoListProps = {
  orgName: string;
  onChange: (value: string) => void;
  onSubmit: (value: string) => void;
  loading?: boolean;
  dataList: ApiData[];
};

export const GIT_REPO_LIST_PLACEHOLDER = 'Введите название организации';

export const GitRepoList: React.FC<GitRepoListProps> = ({
  orgName,
  onChange,
  onSubmit,
  loading = false,
  dataList,
}) => {
  return (
    <div className={styles.main}>
      <Search
        value={orgName}
        placeholder={GIT_REPO_LIST_PLACEHOLDER}
        onChange={onChange}
        onSubmit={onSubmit}
        loading={loading}
      />
      <div className={styles.list}>
        {dataList.map((data) => (
          <GitRepoTile key={data.id} apiData={data} />
        ))}
      </div>
    </div>
  );
};
