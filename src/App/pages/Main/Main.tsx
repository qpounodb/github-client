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
import { OrderDir, SortKind } from '~models/queryParams';
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
  const store = useLocalStore(() => new ReposStore());
  const navigate = useNavigate();
  const [input, setInput] = React.useState(queryParamsStore.orgName);

  React.useEffect(() => {
    runInAction(() => setInput(queryParamsStore.orgName));
  }, [queryParamsStore.orgName]);

  const selectedSort = React.useMemo(
    () => SORT_OPTIONS.find((o) => o.key === queryParamsStore.sort),
    [queryParamsStore.sort]
  );

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

  return (
    <div className={styles.root}>
      <div className={styles.section}>
        <Search
          value={input}
          placeholder={SEARCH_PLACEHOLDER}
          onChange={setInput}
          onSubmit={submitName}
          disabled={!input || store?.isLoading}
        />
      </div>
      <div className={styles.section}>
        <SortSelect
          options={SORT_OPTIONS}
          selected={selectedSort}
          asc={queryParamsStore.order === 'asc'}
          onSortChange={submitSort}
          onOrderChange={submitOrder}
          disabled={store?.isLoading}
        />
      </div>
      <div className={styles.section}>
        <WithLoader loading={store?.isLoading}>
          <GitRepoList
            data={store?.data}
            getCardClickHandler={getCardClickHandler}
          />
        </WithLoader>
      </div>
      <div>
        <Pagination
          onSubmit={submitPage}
          page={queryParamsStore.page}
          count={store?.pagesCount ?? 0}
          disabled={store?.isLoading}
        />
      </div>
    </div>
  );
};

export default observer(Main);
