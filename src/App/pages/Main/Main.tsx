import React from 'react';
import { Pagination } from '~/App/components/Pagination';
import { useGithubReposCtx } from '~/App/hooks/useGithubReposCtx';
import { GitRepoList } from './components/GitRepoList';
import styles from './Main.module.scss';

export const Main: React.FC = () => {
  const { loading, orgName, setOrgName, repos, fetch, page, pages_count } =
    useGithubReposCtx();

  const submitOrgNameHandler = () => {
    fetch(1);
  };

  const submitPageHandler = (page: number) => {
    fetch(page);
  };

  return (
    <div className={styles.main}>
      <GitRepoList
        orgName={orgName}
        onChange={setOrgName}
        onSubmit={submitOrgNameHandler}
        dataList={repos}
        loading={loading}
      />
      <div className={styles.pagination}>
        <Pagination
          onSubmit={submitPageHandler}
          page={page}
          count={pages_count}
          loading={loading}
        />
      </div>
    </div>
  );
};
