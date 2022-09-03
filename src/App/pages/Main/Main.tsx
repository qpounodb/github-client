import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Pagination } from '~/App/components/Pagination';
import { useGithubReposCtx } from '~/App/pages/Main/hooks/useGithubReposCtx';
import { Repository } from '~/shared/GithubAPI';
import { isSome } from '~/shared/utils';
import { GitRepoList } from './components/GitRepoList';
import styles from './Main.module.scss';

type PathParams = { orgName?: string; pageNum?: string };

export const Main: React.FC = () => {
  const navigate = useNavigate();
  const { orgName, pageNum } = useParams<PathParams>();
  const { state, fetch } = useGithubReposCtx();

  const controller = new AbortController();

  React.useEffect(() => {
    if (!orgName) return;
    const page = isSome(pageNum) ? Number(pageNum) : 1;

    fetch(orgName, isNaN(page) ? 1 : page, controller.signal);

    // NOTE: Run effect once on component mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orgName, pageNum]);

  const getCardClickHandler =
    ({ name, owner }: Repository) =>
    () => {
      controller.abort();
      navigate(`/repo/${owner.login}/${name}`);
    };

  return (
    <div className={styles.root}>
      <GitRepoList
        state={state.repos}
        orgName={state.orgName}
        onSubmit={(name) => navigate(`/org/${name}`)}
        getCardClickHandler={getCardClickHandler}
      />
      <div className={styles.pagination}>
        <Pagination
          onSubmit={(page) => navigate(`/org/${state.orgName}/${page}`)}
          page={state.params.page}
          count={state.pages_count}
          loading={state.repos.loading}
        />
      </div>
    </div>
  );
};
