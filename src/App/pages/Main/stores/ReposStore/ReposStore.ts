import {
  action,
  computed,
  IReactionDisposer,
  makeObservable,
  observable,
  reaction,
} from 'mobx';

import {
  appParamsToApiParams,
  defaultQueryParamsAPI,
  QueryParamsApp,
} from '~models/queryParams';
import { ApiStore } from '~stores';
import { rootStore } from '~stores/RootStore';
import type { ILocalStore } from '~types';
import { getPagesCount } from '~utils';

import { GithubReposApi, ReposApiData } from './api';

type PrivateFields = '_apiData' | '_end';

export class ReposStore implements ILocalStore {
  private readonly _api: GithubReposApi = new GithubReposApi();
  private readonly _apiStore: ApiStore = new ApiStore();

  private _apiData: null | ReposApiData = null;

  private _queryParamsReaction: null | IReactionDisposer = null;

  constructor() {
    makeObservable<ReposStore, PrivateFields>(this, {
      _apiData: observable.ref,
      data: computed,
      pagesCount: computed,
      isLoading: computed,
      fetch: action.bound,
      _end: action.bound,
    });
  }

  get data(): null | ReposApiData['data'] {
    return this._apiData?.data ?? null;
  }

  get pagesCount(): number {
    const totalCount = this._apiData?.totalCount ?? 0;
    return getPagesCount(totalCount, defaultQueryParamsAPI.per_page);
  }

  get isLoading(): boolean {
    return this._apiStore.isLoading;
  }

  init(): void {
    this._queryParamsReaction ??= reaction(
      () => rootStore.queryParamsStore.params,
      () => void this.fetch()
    );

    void this.fetch();
  }

  destroy(): void {
    this._queryParamsReaction?.();
    this._queryParamsReaction = null;
    this._apiStore.destroy();
  }

  async fetch(): Promise<void> {
    if (this.isLoading) {
      return;
    }

    const { orgName, ...params } = rootStore.queryParamsStore.params;
    if (!orgName) {
      return;
    }

    const result = await this._apiStore.run((signal) =>
      this._api.getAll(orgName, appParamsToApiParams(params), signal)
    );

    this._end(orgName, params, result);
  }

  private _end(
    orgName: string,
    params: QueryParamsApp,
    data: null | ReposApiData
  ): void {
    this._apiData = data;

    if (this._apiStore.isError || this._apiStore.isIdle) {
      return;
    }

    if (this._apiStore.isSuccess && data === null) {
      rootStore.notifyStore.info(`Organization "${orgName}" not found!`);
      return;
    }

    if (params.page && params.page > this.pagesCount) {
      rootStore.queryParamsStore.setPageNum(this.pagesCount);
    }
  }
}
