import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Pagination } from '~/App/components/Pagination';
import { useGithubReposCtx } from '~/App/hooks/useGithubReposCtx';
import { GitRepoList } from './components/GitRepoList';
import type { ApiData } from './components/GitRepoTile';
import styles from './Main.module.scss';

export const Main: React.FC = () => {
  const navigate = useNavigate();
  const { loading, orgName, repos, fetch, page, pages_count } =
    useGithubReposCtx();

  const getCardClickHandler = (data: ApiData) => () => {
    navigate(`/repo/${data.owner.login}/${data.name}`);
  };

  return (
    <div className={styles.main}>
      <GitRepoList
        orgName={orgName}
        onSubmit={(name) => fetch(name, 1)}
        dataList={repos}
        loading={loading}
        getCardClickHandler={getCardClickHandler}
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
