import { runInAction } from 'mobx';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckBox } from '~/App/components/CheckBox';
import { Option, Select } from '~/App/components/dropdown';
import { Pagination } from '~/App/components/Pagination';
import { Search } from '~/App/components/Search';
import { WithLoader } from '~/App/components/WithLoader';
import { RepoModel } from '~/App/models/github';
import { OrderDir, SortKind } from '~/App/models/queryParams';
import { ReposStore } from '~/App/stores';
import { rootStore } from '~/App/stores/RootStore';
import { useLocalStore } from '~/shared/hooks';
import { joinClassName } from '~/shared/utils';
import { GitRepoList } from './components/GitRepoList';
import styles from './Main.module.scss';

const SEARCH_PLACEHOLDER = 'Введите название организации';

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
          loading={store.loading}
        />
      </div>
      <div className={joinClassName(styles.section, styles.filters)}>
        <Select
          options={SORT_OPTIONS}
          selected={selectedSort}
          onChange={submitSort}
          placeholder="Set sort by..."
        />
        <label>
          <CheckBox
            checked={queryParamsStore.order === 'asc'}
            onChange={submitOrder}
          />
          Asc order
        </label>
      </div>
      <div className={styles.section}>
        <WithLoader loading={store.loading}>
          <GitRepoList
            data={store.state.data}
            getCardClickHandler={getCardClickHandler}
          />
        </WithLoader>
      </div>
      <div>
        <Pagination
          onSubmit={submitPage}
          page={queryParamsStore.page}
          count={store.pagesCount}
          loading={store.loading}
        />
      </div>
    </div>
  );
};

export default observer(Main);
