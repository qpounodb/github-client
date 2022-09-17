import { action, computed, makeObservable, observable } from 'mobx';

import { ApiStore } from '~stores';
import { rootStore } from '~stores/RootStore';
import type { ILocalStore } from '~types';

import { GithubRepoApi, RepoApiDataMap, RepoApiResult } from './api';

type PrivateFields = '_apiDataMap' | '_end';

export class RepoStore implements ILocalStore {
  private readonly _api: GithubRepoApi;
  private readonly _apiStore: ApiStore = new ApiStore();

  private _apiDataMap: RepoApiDataMap | null = null;

  constructor(orgName = '', repoName = '') {
    this._api = new GithubRepoApi(orgName, repoName);

    makeObservable<RepoStore, PrivateFields>(this, {
      _apiDataMap: observable.ref,
      dataMap: computed,
      isLoading: computed,
      fetch: action.bound,
      _end: action.bound,
    });
  }

  get dataMap(): RepoApiDataMap | null {
    return this._apiDataMap;
  }

  get isLoading(): boolean {
    return this._apiStore.isLoading;
  }

  init(): void {
    void this.fetch();
  }

  destroy(): void {
    this._apiStore.destroy();
  }

  async fetch(): Promise<void> {
    if (this.isLoading) {
      return;
    }

    const result = await this._apiStore.run(this._api.getAll.bind(this._api));
    this._end(result);
  }

  private _end(result: RepoApiResult | null): void {
    if (!result) {
      this.reset();
      return;
    }
    this._apiDataMap = result.dataMap;

    result.errors.forEach((error) => rootStore.notifyStore.error(error));
  }

  reset(): void {
    this._apiDataMap = null;
  }
}
