import { observer, useLocalStore } from 'mobx-react-lite';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Pagination } from '~/App/components/Pagination';
import { Search } from '~/App/components/Search';
import { WithLoader } from '~/App/components/WithLoader';
import { RepoModel } from '~/App/models/GitHub';
import { ReposStore } from '~/App/stores';
import { GitRepoList } from './components/GitRepoList';
import styles from './Main.module.scss';

const SEARCH_PLACEHOLDER = 'Введите название организации';

export const Main: React.FC = observer(() => {
  const store = useLocalStore(() => new ReposStore());
  const navigate = useNavigate();
  const [input, setInput] = React.useState('');
  const [orgName, setOrgName] = React.useState('');
  const [pageNum, setPageNum] = React.useState(1);

  React.useEffect(() => {
    return () => store.destroy();
  }, [store]);

  const getCardClickHandler = React.useCallback(
    ({ name, owner }: RepoModel) =>
      () =>
        navigate(`/repo/${owner.login}/${name}`),
    [navigate]
  );

  const submitName = React.useCallback(
    (name: string) => {
      setOrgName(name);
      if (!name) return;
      store.fetch(name, pageNum);
    },
    [pageNum, store]
  );

  const submitPage = React.useCallback(
    (page: number) => {
      setPageNum(page);
      if (!page) return;
      store.fetch(orgName, page);
    },
    [orgName, store]
  );

  return (
    <div className={styles.root}>
      <div className={styles.section}>
        <Search
          value={input}
          placeholder={SEARCH_PLACEHOLDER}
          onChange={setInput}
          onSubmit={submitName}
          loading={store.loading}
        />
      </div>
      <div className={styles.section}>
        <WithLoader loading={store.loading}>
          <GitRepoList
            state={store.state}
            getCardClickHandler={getCardClickHandler}
          />
        </WithLoader>
      </div>
      <div>
        <Pagination
          onSubmit={submitPage}
          page={pageNum}
          count={store.pagesCount}
          loading={store.loading}
        />
      </div>
    </div>
  );
});
