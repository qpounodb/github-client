import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Pagination } from '~/App/components/Pagination';
import { useGithubReposCtx } from '~/App/pages/Main/hooks/useGithubReposCtx';
import { Repository } from '~/shared/GithubAPI';
import { GitRepoList } from './components/GitRepoList';
import styles from './Main.module.scss';

export const Main: React.FC = () => {
  const navigate = useNavigate();
  const { state, fetch } = useGithubReposCtx();

  const getCardClickHandler =
    ({ name, owner }: Repository) =>
    () =>
      navigate(`/repo/${owner.login}/${name}`);

  return (
    <div className={styles.main}>
      <GitRepoList
        state={state.repos}
        orgName={state.orgName}
        onSubmit={(name) => fetch(name, 1)}
        getCardClickHandler={getCardClickHandler}
      />
      <div className={styles.pagination}>
        <Pagination
          onSubmit={(num) => fetch(state.orgName, num)}
          page={state.params.page}
          count={state.pages_count}
          loading={state.repos.loading}
        />
      </div>
    </div>
  );
};
