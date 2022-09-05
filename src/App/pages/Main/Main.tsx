import { observer, useLocalStore } from 'mobx-react-lite';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Pagination } from '~/App/components/Pagination';
import { Search } from '~/App/components/Search';
import { WithLoader } from '~/App/components/WithLoader';
import { RepoModel } from '~/App/models/GitHub';
import { ReposStore } from '~/App/stores';
import { rootStore } from '~/App/stores/RootStore';
import { GitRepoList } from './components/GitRepoList';
import styles from './Main.module.scss';

const SEARCH_PLACEHOLDER = 'Введите название организации';

export const Main: React.FC = observer(function Main() {
  const store = useLocalStore(() => new ReposStore());
  const navigate = useNavigate();
  const [input, setInput] = React.useState(rootStore.queryParamsStore.orgName);

  React.useEffect(() => {
    console.log('Main mount');
    store.init();
    store.fetch();
    return () => {
      console.log('Main unmount');
      store.destroy();
    };
  }, [store]);

  const submitName = React.useCallback((name: string) => {
    rootStore.queryParamsStore.setOrgName(name);
  }, []);

  const submitPage = React.useCallback((page: number) => {
    rootStore.queryParamsStore.setPageNum(page);
  }, []);

  const getCardClickHandler = React.useCallback(
    ({ name, owner }: RepoModel) =>
      () =>
        navigate(`/repo/${owner.login}/${name}`),
    [navigate]
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
            data={store.state?.data}
            getCardClickHandler={getCardClickHandler}
          />
        </WithLoader>
      </div>
      <div>
        <Pagination
          onSubmit={submitPage}
          page={rootStore.queryParamsStore.pageNum}
          count={store.pagesCount}
          loading={store.loading}
        />
      </div>
    </div>
  );
});
