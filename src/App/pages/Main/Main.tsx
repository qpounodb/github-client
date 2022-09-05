import { observer, useLocalStore } from 'mobx-react-lite';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckBox } from '~/App/components/CheckBox';
import { Pagination } from '~/App/components/Pagination';
import { Search } from '~/App/components/Search';
import { Option, Select } from '~/App/components/Select';
import { WithLoader } from '~/App/components/WithLoader';
import { RepoModel } from '~/App/models/GitHub';
import { ReposStore } from '~/App/stores';
import { rootStore } from '~/App/stores/RootStore';
import { SORT, toSortType } from '~/shared/GithubAPI';
import { joinClassName } from '~/shared/utils';
import { GitRepoList } from './components/GitRepoList';
import styles from './Main.module.scss';

const SEARCH_PLACEHOLDER = 'Введите название организации';

const SORT_OPTIONS: Option[] = SORT.map((x) => ({
  key: x,
  value: `Sort repos by ${x.split('_').join(' ')}`,
}));

export const Main: React.FC = observer(function Main() {
  const store = useLocalStore(() => new ReposStore());
  const navigate = useNavigate();
  const [input, setInput] = React.useState(rootStore.queryParamsStore.orgName);
  const [sortType, setSortType] = React.useState(
    rootStore.queryParamsStore.sortType
  );

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

  const submitSort = React.useCallback((sort: string | number) => {
    setSortType(toSortType(String(sort)));
    rootStore.queryParamsStore.setSort(String(sort));
  }, []);

  const submitOrder = React.useCallback((isAsc: boolean) => {
    rootStore.queryParamsStore.setOrder(isAsc ? 'asc' : 'desc');
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
      <div className={joinClassName(styles.section, styles.filters)}>
        <Select
          options={SORT_OPTIONS}
          selected={sortType}
          onChange={submitSort}
          placeholder="Set sort by"
        />
        <label>
          <CheckBox
            checked={rootStore.queryParamsStore.orderType === 'asc'}
            onChange={submitOrder}
          />
          Asc order
        </label>
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
