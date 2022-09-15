import { action, computed, makeObservable } from 'mobx';

import type { ILocalStore } from '~hooks';
import type { ApiStore } from '~stores';
import { remapRecord } from '~utils';

import { GithubRepoAPI } from './api';
import {
  ApiCommitStore,
  ApiRepoBranchesStore,
  ApiRepoContributorsStore,
  ApiRepoInfoStore,
  ApiRepoLangsStore,
  ApiRepoReadmeStore,
} from './stores';

type ApiStoresMap = {
  info: ApiRepoInfoStore;
  branches: ApiRepoBranchesStore;
  langs: ApiRepoLangsStore;
  contributors: ApiRepoContributorsStore;
  commit: ApiCommitStore;
  readme: ApiRepoReadmeStore;
};

type StoresStateMap = {
  [K in keyof ApiStoresMap]: ApiStoresMap[K]['state'];
};

export class RepoStore implements ILocalStore {
  private readonly _api: GithubRepoAPI;

  private readonly _storesMap: ApiStoresMap;

  constructor(orgName = '', repoName = '') {
    this._api = new GithubRepoAPI(orgName, repoName);

    this._storesMap = {
      info: new ApiRepoInfoStore(this._api),
      branches: new ApiRepoBranchesStore(this._api),
      langs: new ApiRepoLangsStore(this._api),
      contributors: new ApiRepoContributorsStore(this._api),
      commit: new ApiCommitStore(this._api),
      readme: new ApiRepoReadmeStore(this._api),
    };

    makeObservable<RepoStore>(this, {
      loading: computed,
      success: computed,
      error: computed,
      state: computed,
      fetch: action.bound,
    });
  }

  private get _stores(): ApiStore[] {
    return Object.values(this._storesMap);
  }

  get loading(): boolean {
    return this._stores.some((store) => store.loading);
  }

  get error(): boolean {
    return this._stores.some((store) => store.error);
  }

  get success(): boolean {
    return this._stores.every((store) => store.success);
  }

  get state(): StoresStateMap {
    return remapRecord(this._storesMap, ({ state }) => state);
  }

  async fetch(): Promise<void> {
    if (this.loading) {
      return;
    }

    const tasks = this._stores.map((store) => store.fetch({}));

    return Promise.all(tasks)
      .catch(() => null)
      .then(null);
  }

  stop(): void {
    this._stores.forEach((store) => store.stop());
  }

  reset(): void {
    this._stores.forEach((store) => store.reset());
  }

  init(): void {
    this.fetch().then(null, null);
  }

  destroy(): void {
    this._stores.forEach((store) => store.destroy());
  }
}
