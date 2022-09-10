import {
  action,
  computed,
  IReactionDisposer,
  makeObservable,
  reaction,
} from 'mobx';
import { RepoModelCollection } from '~/App/models/github';
import { defaultQueryParamsAPI } from '~/App/models/queryParams';
import { GithubReposAPI } from '~/shared/githubAPI';
import { ILocalStore } from '~/shared/hooks';
import { DataState } from '~/shared/types';
import {
  ApiReposStore,
  ApiSearchReposStore,
  ApiSearchUsersStore,
  ApiStore,
} from '../ApiStore';
import { rootStore } from '../RootStore';

type PrivateFields = '_searchFailed';

export class ReposStore implements ILocalStore {
  private readonly _api: GithubReposAPI = new GithubReposAPI();

  private _apiStores = {
    checkOrg: new ApiSearchUsersStore(this._api),
    reposCount: new ApiSearchReposStore(this._api),
    repos: new ApiReposStore(this._api),
  };

  private _failReaction: null | IReactionDisposer = null;
  private _queryReaction: null | IReactionDisposer = null;

  constructor() {
    makeObservable<ReposStore, PrivateFields>(this, {
      state: computed,
      loading: computed,
      success: computed,
      error: computed,
      pagesCount: computed,
      _searchFailed: computed,
      fetch: action.bound,
    });
  }

  private get _stores(): ApiStore[] {
    return Object.values(this._apiStores);
  }

  get state(): DataState<RepoModelCollection> {
    return this._apiStores.repos.state ?? null;
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

  get pagesCount(): number {
    const totalCount = this._apiStores?.reposCount.data?.total_count || 0;
    return Math.ceil(totalCount / defaultQueryParamsAPI.per_page);
  }

  private get _searchFailed(): boolean {
    return (
      !this.success ||
      this._apiStores.checkOrg.data?.total_count === 0 ||
      this._apiStores.reposCount.data?.total_count === 0
    );
  }

  async fetch(): Promise<void> {
    const params = rootStore.queryParamsStore.params;
    if (this.loading) {
      return;
    }
    if (!params.orgName || !params.page) {
      this.reset();
      return;
    }
    try {
      if (params.page === 1) {
        await this._apiStores.checkOrg.fetch({ orgName: params.orgName });
      }
      await this._apiStores.reposCount.fetch({ orgName: params.orgName });
      await this._apiStores.repos.fetch(params);
    } catch {}
  }

  stop(): void {
    this._stores.forEach((store) => store.stop());
  }

  reset(): void {
    this._stores.forEach((store) => store.reset());
  }

  init(): void {
    this._failReaction ??= reaction(
      () => this._searchFailed,
      (isFailed) => {
        if (!isFailed) return;
        this.stop();
        this.reset();
      }
    );

    this._queryReaction ??= reaction(
      () => rootStore.queryParamsStore.params,
      () => {
        this.fetch();
      }
    );

    this.fetch().then(null, null);
  }

  destroy(): void {
    this._failReaction?.();
    this._queryReaction?.();
    this._failReaction = null;
    this._queryReaction = null;
    this._stores.forEach((store) => store.destroy());
  }
}
