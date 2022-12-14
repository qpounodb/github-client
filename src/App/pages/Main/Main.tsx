import { runInAction } from 'mobx';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { useNavigate } from 'react-router-dom';

import { SortSelect } from '~/App/components/SortSelect';
import { Option } from '~components/dropdown';
import { Pagination } from '~components/Pagination';
import { Search } from '~components/Search';
import { WithLoader } from '~components/WithLoader';
import { useLocalStore } from '~hooks';
import { RepoModel } from '~models/github';
import { defaultQueryParamsApp, OrderDir, SortKind } from '~models/queryParams';
import { rootStore } from '~stores/RootStore';

import { GitRepoList } from './components/GitRepoList';
import styles from './Main.module.scss';
import { ReposStore } from './stores';

const SEARCH_PLACEHOLDER = 'Enter organization name';

const SORT_OPTIONS: Option[] = Object.values(SortKind).map((value) => ({
  key: value,
  value: `Sort repos by ${value.split('_').join(' ')}`,
}));

const Main: React.FC = () => {
  const { queryParamsStore } = rootStore;
  const navigate = useNavigate();
  const [input, setInput] = React.useState(queryParamsStore.orgName);

  const store = useLocalStore(React.useCallback(() => new ReposStore(), []));

  React.useEffect(() => {
    runInAction(() => setInput(queryParamsStore.orgName));
  }, [queryParamsStore.orgName]);

  const submitName = React.useCallback(
    (name: string) => queryParamsStore.setOrgName(name),
    [queryParamsStore]
  );

  const submitPage = React.useCallback(
    (page: number) => queryParamsStore.setPageNum(page),
    [queryParamsStore]
  );

  const submitSort = React.useCallback(
    ({ key }: Option) => queryParamsStore.setSort(String(key)),
    [queryParamsStore]
  );

  const submitOrder = React.useCallback(
    (isAsc: boolean) =>
      queryParamsStore.setOrder(isAsc ? OrderDir.asc : OrderDir.desc),
    [queryParamsStore]
  );

  const getCardClickHandler = React.useCallback(
    ({ name, owner }: RepoModel) =>
      () =>
        navigate(`/repo/${owner.login}/${name}`),
    [navigate]
  );

  const selectedSort = React.useMemo(() => {
    const sort = queryParamsStore.sort ?? defaultQueryParamsApp.sort;
    return SORT_OPTIONS.find((o) => o.key === sort);
  }, [queryParamsStore.sort]);

  const isAscOrder: boolean = React.useMemo(() => {
    const order = queryParamsStore.order ?? defaultQueryParamsApp.order;
    return order === OrderDir.asc;
  }, [queryParamsStore.order]);

  return (
    <div className={styles.root}>
      <div>
        <Search
          value={input}
          placeholder={SEARCH_PLACEHOLDER}
          onChange={setInput}
          onSubmit={submitName}
          disabled={!input || store.isLoading}
        />
      </div>
      <div>
        <SortSelect
          options={SORT_OPTIONS}
          selected={selectedSort}
          asc={isAscOrder}
          onSortChange={submitSort}
          onOrderChange={submitOrder}
          disabled={store.isLoading}
        />
      </div>
      <div>
        <WithLoader loading={store.isLoading}>
          <GitRepoList
            data={store.data}
            getCardClickHandler={getCardClickHandler}
          />
        </WithLoader>
      </div>
      <div className={styles.root__section}>
        <Pagination
          onSubmit={submitPage}
          page={queryParamsStore.page}
          count={store.pagesCount ?? 0}
          disabled={store.isLoading}
        />
      </div>
    </div>
  );
};

export default observer(Main);
