import { action, computed, flow, makeObservable } from 'mobx';
import { RepoModelCollection } from '~/App/models/GitHub';
import { defaultRequestReposParams, GithubReposAPI } from '~/shared/GithubAPI';
import { ILocalStore } from '~/shared/hooks';
import { DataState, Nullable } from '~/shared/types';
import { isSome } from '~/shared/utils';
import {
  ApiReposStore,
  ApiSearchReposStore,
  ApiSearchUsersStore,
  ApiStore,
} from '../ApiStore';

type PrivateField = '_isCheckOrgFailed' | '_isReposCountFailed';

export class ReposStore implements ILocalStore {
  private readonly _api: GithubReposAPI = new GithubReposAPI();

  private readonly _apiStores: Record<string, ApiStore> = {
    checkOrg: new ApiSearchUsersStore(this._api),
    reposCount: new ApiSearchReposStore(this._api),
    repos: new ApiReposStore(this._api),
  };

  constructor() {
    makeObservable<ReposStore, PrivateField>(this, {
      state: computed,
      loading: computed,
      success: computed,
      error: computed,
      pagesCount: computed,
      fetch: flow.bound,
      destroy: action.bound,
      _isCheckOrgFailed: computed,
      _isReposCountFailed: computed,
    });

    console.log('ReposStore created');
  }

  private get _stores(): ApiStore[] {
    return Object.values(this._apiStores);
  }

  get state(): DataState<RepoModelCollection> {
    return this._apiStores.repos.state;
  }

  get loading(): boolean {
    return this._stores.some((store) => store.loading);
  }
  get success(): boolean {
    return this._stores.every((store) => store.success);
  }

  get error(): Nullable<Error> {
    return this._stores
      .map((store) => store.error)
      .find((error) => isSome(error));
  }

  get pagesCount(): number {
    const totalCount = this._apiStores.reposCount.data?.total_count || 0;
    return Math.ceil(totalCount / defaultRequestReposParams.per_page);
  }

  *fetch(orgName: string, page = 1): Generator<Promise<void>, void> {
    if (this.loading) {
      return;
    }

    if (page === 1) {
      yield this._apiStores.checkOrg.fetch({ orgName });
      if (this._isCheckOrgFailed) {
        this.reset();
        return;
      }
    }

    yield this._apiStores.reposCount.fetch({ orgName });
    if (this._isReposCountFailed) {
      this.reset();
      return;
    }

    yield this._apiStores.repos.fetch({ orgName, page });
  }

  stop(): void {
    this._stores.forEach((store) => store.stop());
  }

  reset(): void {
    this._stores.forEach((store) => store.reset());
  }

  destroy(): void {
    this.stop();
    this._stores.forEach((store) => store.destroy());
    console.log('ReposStore destroyed');
  }

  private get _isCheckOrgFailed(): boolean {
    return (
      !this._apiStores.checkOrg.success ||
      this._apiStores.checkOrg.data?.total_count === 0
    );
  }

  private get _isReposCountFailed(): boolean {
    return (
      !this._apiStores.reposCount.success ||
      this._apiStores.reposCount.data?.total_count === 0
    );
  }
}
