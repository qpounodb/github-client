import { observer } from 'mobx-react-lite';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckBox } from '~/App/components/CheckBox';
import { Option, Select } from '~/App/components/dropdown';
import { Pagination } from '~/App/components/Pagination';
import { Search } from '~/App/components/Search';
import { WithLoader } from '~/App/components/WithLoader';
import { RepoModel } from '~/App/models/github';
import { SortKind } from '~/App/models/queryParams';
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
  const store = useLocalStore(() => new ReposStore());
  const navigate = useNavigate();
  const [input, setInput] = React.useState(rootStore.queryParamsStore.orgName);

  const selectedSort = React.useMemo(
    () => SORT_OPTIONS.find((o) => o.key === rootStore.queryParamsStore.sort),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [rootStore.queryParamsStore.sort]
  );

  const submitName = React.useCallback((name: string) => {
    rootStore.queryParamsStore.setOrgName(name);
  }, []);

  const submitPage = React.useCallback((page: number) => {
    rootStore.queryParamsStore.setPageNum(page);
  }, []);

  const submitSort = React.useCallback(({ key }: Option) => {
    rootStore.queryParamsStore.setSort(String(key));
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
          selected={selectedSort}
          onChange={submitSort}
          placeholder="Set sort by..."
        />
        <label>
          <CheckBox
            checked={rootStore.queryParamsStore.order === 'asc'}
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
          page={rootStore.queryParamsStore.page}
          count={store.pagesCount}
          loading={store.loading}
        />
      </div>
    </div>
  );
};

export default observer(Main);
