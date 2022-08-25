import React from 'react';
import { Pagination } from '~/App/components/Pagination';
import { useGithubReposCtx } from '~/App/hooks/useGithubReposCtx';
import { GitRepoList } from './components/GitRepoList';
import styles from './Main.module.scss';

export const Main: React.FC = () => {
  const [loading, setLoading] = React.useState(false);
  const [submit, setSubmit] = React.useState(false);
  const { orgName, setOrgName, repos, fetch, setPage, page, pages_count } =
    useGithubReposCtx();

  React.useEffect(() => {
    if (loading || !submit) return;
    setSubmit(false);
    setLoading(true);
    fetch()
      .catch((error) => {
        console.error(error);
      })
      .finally(() => setLoading(false));
  }, [fetch, loading, submit]);

  const pager = {
    onPrev() {
      if (loading || page < 2) return;
      setPage(page - 1);
      setLoading(true);
      fetch().finally(() => setLoading(false));
    },
    onNext() {
      if (loading || page >= pages_count) return;
      setPage(page + 1);
      setLoading(true);
      fetch().finally(() => setLoading(false));
    },
  };

  return (
    <div className={styles.main}>
      <GitRepoList
        orgName={orgName}
        onChange={setOrgName}
        onSubmit={() => setSubmit(true)}
        dataList={repos}
        loading={loading}
      />
      <div className={styles.pagination}>
        <Pagination
          {...pager}
          page={page}
          count={pages_count}
          loading={loading}
        />
      </div>
    </div>
  );
};
