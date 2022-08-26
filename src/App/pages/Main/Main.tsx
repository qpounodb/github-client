import React from 'react';
import { Pagination } from '~/App/components/Pagination';
import { useGithubReposCtx } from '~/App/hooks/useGithubReposCtx';
import { GitRepoList } from './components/GitRepoList';
import styles from './Main.module.scss';

export const Main: React.FC = () => {
  const { loading, orgName, repos, fetch, page, pages_count } =
    useGithubReposCtx();

  return (
    <div className={styles.main}>
      <GitRepoList
        orgName={orgName}
        onSubmit={(name) => fetch(name, 1)}
        dataList={repos}
        loading={loading}
      />
      <div className={styles.pagination}>
        <Pagination
          onSubmit={(num) => fetch(orgName, num)}
          page={page}
          count={pages_count}
          loading={loading}
        />
      </div>
    </div>
  );
};
