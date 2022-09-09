import { CanceledError } from 'axios';
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
import { DataState, Nullable } from '~/shared/types';
import { isSome, toError } from '~/shared/utils';
import {
  ApiReposStore,
  ApiSearchReposStore,
  ApiSearchUsersStore,
  ApiStore,
} from '../ApiStore';
import { rootStore } from '../RootStore';

export class ReposStore implements ILocalStore {
  private readonly _api: GithubReposAPI = new GithubReposAPI();

  private _apiStores: Record<string, ApiStore> = {
    checkOrg: new ApiSearchUsersStore(this._api),
    reposCount: new ApiSearchReposStore(this._api),
    repos: new ApiReposStore(this._api),
  };

  private _failReaction: null | IReactionDisposer = null;
  private _queryReaction: null | IReactionDisposer = null;

  constructor() {
    makeObservable<ReposStore>(this, {
      state: computed,
      loading: computed,
      success: computed,
      error: computed,
      pagesCount: computed,
      fetch: action.bound,
    });
  }

  init(): void {
    this._failReaction ??= reaction(
      () =>
        !this._apiStores?.checkOrg.success ||
        this._apiStores?.checkOrg.data?.total_count === 0 ||
        !this._apiStores?.reposCount.success ||
        this._apiStores?.reposCount.data?.total_count === 0,
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

  private get _stores(): ApiStore[] {
    return Object.values(this._apiStores);
  }

  get state(): DataState<RepoModelCollection> {
    return this._apiStores.repos.state ?? null;
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
    const totalCount = this._apiStores?.reposCount.data?.total_count || 0;
    return Math.ceil(totalCount / defaultQueryParamsAPI.per_page);
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
        await this._apiStores?.checkOrg.fetch({ orgName: params.orgName });
      }
      await this._apiStores?.reposCount.fetch({ orgName: params.orgName });
      await this._apiStores?.repos.fetch(params);
    } catch (error) {
      if (!(toError(error) instanceof CanceledError)) {
        console.error(error);
      }
    }
  }

  stop(): void {
    this._stores.forEach((store) => store.stop());
  }

  reset(): void {
    this._stores.forEach((store) => store.reset());
  }
}
