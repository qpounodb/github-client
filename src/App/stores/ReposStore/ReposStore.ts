import {
  action,
  computed,
  IReactionDisposer,
  makeObservable,
  reaction,
  runInAction,
} from 'mobx';

import { RepoModelCollection } from '~/App/models/github';
import { defaultQueryParamsAPI } from '~/App/models/queryParams';
import { GithubReposAPI } from '~/shared/githubAPI';
import { ILocalStore } from '~/shared/hooks';
import { DataState } from '~/shared/types';

import {
  ApiReposStore,
  ApiSearchReposStore,
  ApiSearchStore,
  ApiSearchUsersStore,
  ApiStore,
} from '../ApiStore';
import { rootStore } from '../RootStore';

const DEV_MODE = process.env.NODE_ENV === 'development';

//
// If DEV_MODE then loggin ReposStore life cycle ENABLED.
//
// Complex startup:
//  1. <React.StrictMod> active (double mounting all components)
//  2. Some query params detected
//
// Life cycle:
//  1. <React.StrictMod> mount Main page
//  2. ReposStore initializing:
//     a. create rections for searching api
//     b. call fetch (1):
//        - get promise fetching search api
//
//  3. <React.StrictMod> unmount Main page
//  4. ReposStore call destroy:
//     a. aborting active request
//     b. dispose reactions
//
//  5. <React.StrictMod> again mount Main page
//  6. ReposStore again start initializing:
//     a. recreate disposed rections for searching api
//     b. call fetch (2):
//        - get promise fetching search api
//
// ⚠️ About that time the first fetching promise throw Cancelation Error
// ⚠️ We need to check the context where the error was caught and don't abort second promise!
//

type StoresMap = {
  checkOrg: ApiSearchUsersStore;
  searchRepos: ApiSearchReposStore;
  repos: ApiReposStore;
};

const getNewStores = (api: GithubReposAPI): StoresMap => ({
  checkOrg: new ApiSearchUsersStore(api),
  searchRepos: new ApiSearchReposStore(api),
  repos: new ApiReposStore(api),
});

type PrivateFields = '_handleQueryParams';

export class ReposStore implements ILocalStore {
  private static _ID = 0;
  private _ID = ++ReposStore._ID;
  private _fetchID = 0;

  private _log(...args: unknown[]) {
    if (!DEV_MODE) return;
    console.log(`[ReposStore.${this._ID}/${ReposStore._ID}]`, ...args);
  }

  private readonly _api: GithubReposAPI = new GithubReposAPI();

  private _stopped = false;

  private _apiStoresMap: StoresMap = getNewStores(this._api);

  private _reactionsMap: Record<string, null | IReactionDisposer> = {
    queryParams: null,
    checkOrg: null,
    searchRepos: null,
  };

  constructor() {
    makeObservable<ReposStore, PrivateFields>(this, {
      loading: computed,
      success: computed,
      error: computed,
      pagesCount: computed,
      state: computed,
      fetch: action.bound,
      _handleQueryParams: action.bound,
    });
    this._log('created');
  }

  private get _apiStores(): ApiStore[] {
    return Object.values(this._apiStoresMap);
  }

  private get _reactions(): Array<null | IReactionDisposer> {
    return Object.values(this._reactionsMap);
  }

  get loading(): boolean {
    return this._apiStores.some((store) => store.loading);
  }

  get error(): boolean {
    return this._apiStores.some((store) => store.error);
  }

  get success(): boolean {
    return this._apiStores.every((store) => store.success);
  }

  get pagesCount(): number {
    const totalCount = this._apiStoresMap.searchRepos.data ?? 0;
    this._log('pagesCount', totalCount / defaultQueryParamsAPI.per_page);
    return Math.ceil(totalCount / defaultQueryParamsAPI.per_page);
  }

  get state(): DataState<RepoModelCollection> {
    this._log('state', this._apiStoresMap.repos.state);
    return this._apiStoresMap.repos.state;
  }

  _start() {
    this._log('_start');
    this._stopped = false;
  }

  _stop() {
    this._log('_stop');
    this._stopped = true;
  }

  async fetch(): Promise<void> {
    const fetchId = ++this._fetchID;
    const log = (...args: unknown[]) => {
      this._log(`FETCH.${fetchId}/${this._fetchID} >`, ...args);
    };

    log('start');
    if (this.loading) {
      return;
    }

    const params = rootStore.queryParamsStore.params;
    log('params', params);
    if (!params.orgName) {
      this.reset();
      return;
    }

    try {
      this._start();
      log('checkOrg start');
      await this._apiStoresMap.checkOrg.fetch({ orgName: params.orgName });
      log('checkOrg end');
      if (this._stopped) return;
      log('checkOrg pass');

      this._start();
      log('reposCount start');
      await this._apiStoresMap.searchRepos.fetch({ orgName: params.orgName });
      log('reposCount end');
      if (this._stopped) return;
      runInAction(() => {
        if (params.page && params.page > this.pagesCount) {
          rootStore.queryParamsStore.setPageNum(this.pagesCount);
          return;
        }
      });
      log('reposCount pass');

      this._start();
      log('repos start');
      await this._apiStoresMap.repos.fetch(params);
      log('repos end');
    } catch (err) {
      log('error', err);
      if (fetchId !== this._fetchID) return;
      this.stop();
    }
  }

  stop(): void {
    this._log('stop');
    this._stop();
    this._apiStores.forEach((store) => store.stop());
    this.reset();
  }

  reset(): void {
    this._log('reset');
    this._apiStores.forEach((store) => store.reset());
  }

  private _createLoadingReaction = (
    store: ApiSearchStore
  ): IReactionDisposer => {
    const log = (...args: unknown[]) =>
      this._log('loading-reaction', store.constructor.name, ...args);
    log('created');

    return reaction(
      () => store.loading,
      (loading) => {
        log('is loading?', loading);
        if (loading) return;
        log('is fail?', store.fail);
        if (!store.fail) return;
        runInAction(() => {
          log('stop');
          const orgName = rootStore.queryParamsStore.orgName;
          orgName &&
            rootStore.notifyStore.info(`Organization "${orgName}" not found!`);
          this.stop();
        });
      }
    );
  };

  _handleQueryParams() {
    this._log('_handleQueryParams check orgName');
    if (!rootStore.queryParamsStore.orgName) {
      this.reset();
      return;
    }
    this._log('_handleQueryParams > run fetch');
    void this.fetch();
  }

  init(): void {
    this._log('init start');

    this._reactionsMap.queryParams ??= reaction(
      () => rootStore.queryParamsStore.params,
      (params) => {
        this._log('query-params-reaction', params);
        this._handleQueryParams();
      }
    );

    this._reactionsMap.checkOrg ??= this._createLoadingReaction(
      this._apiStoresMap.checkOrg
    );
    this._reactionsMap.searchRepos ??= this._createLoadingReaction(
      this._apiStoresMap.searchRepos
    );

    this._handleQueryParams();
    this._log('init end');
  }

  destroy(): void {
    this._log('destroy start');
    this._reactionsMap.checkOrg?.();
    this._reactionsMap.searchRepos?.();
    this._reactionsMap.checkOrg = null;
    this._reactionsMap.searchRepos = null;
    this._apiStores.forEach((store) => store.destroy());
    this._apiStoresMap = getNewStores(this._api);
    this._log('destroy end');
  }
}
