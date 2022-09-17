import { CacheRequestConfig } from 'axios-cache-interceptor';

import { AxiosCacheInstance, createAxios } from '~configs/axios-cache';
import {
  getAxiosGithubConfig,
  getAxiosGithubSearchCacheConfig,
} from '~configs/axios-github';
import {
  reposApiEndpoints,
  ReposApiRoute,
} from '~configs/github-api-endpoints';
import type { RepoModelCollection } from '~models/github';
import type { QueryParamsAPI } from '~models/queryParams';

export type ReposApiData = {
  totalCount: number;
  data: null | RepoModelCollection;
};

const getCfg = (signal: AbortSignal): CacheRequestConfig => ({
  signal,
  ...getAxiosGithubSearchCacheConfig(),
});

export class GithubReposApi {
  private _api: AxiosCacheInstance;

  constructor() {
    this._api = createAxios(getAxiosGithubConfig());
  }

  private async _apiGet<T, R>(
    route: ReposApiRoute<T, R>,
    orgName: string,
    config: CacheRequestConfig
  ): Promise<R | null> {
    if (orgName.length === 0) return null;
    const { data } = await this._api.request<T>({
      ...config,
      method: 'GET',
      url: route.getUrl(orgName),
    });
    return (data && route.normalize(data)) ?? null;
  }

  checkOrg(orgName: string, signal: AbortSignal): Promise<number | null> {
    return this._apiGet(reposApiEndpoints.checkOrg, orgName, getCfg(signal));
  }

  getReposCount(orgName: string, signal: AbortSignal): Promise<number | null> {
    return this._apiGet(reposApiEndpoints.reposCount, orgName, getCfg(signal));
  }

  getRepos(
    orgName: string,
    params: QueryParamsAPI,
    signal: AbortSignal
  ): Promise<RepoModelCollection | null> {
    return this._apiGet(reposApiEndpoints.repos, orgName, { signal, params });
  }

  async getAll(
    orgName: string,
    params: QueryParamsAPI,
    signal: AbortSignal
  ): Promise<null | ReposApiData> {
    const orgsCount = await this.checkOrg(orgName, signal);
    if (!orgsCount) return null;

    const totalCount = await this.getReposCount(orgName, signal);
    if (!totalCount) return null;

    const data = await this.getRepos(orgName, params, signal);
    return { totalCount, data };
  }
}
