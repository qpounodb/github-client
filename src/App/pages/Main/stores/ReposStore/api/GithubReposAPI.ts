import { CacheRequestConfig } from 'axios-cache-interceptor';

import { AxiosCacheInstance, createAxios } from '~configs/axios-cache';
import {
  getAxiosGithubConfig,
  getAxiosGithubSearchCacheConfig,
} from '~configs/axios-github';
import { ReposEndpoints, reposEndpoints } from '~configs/github-api-endpoints';
import type { RepoApi, SearchApi } from '~models/github';
import type { QueryParamsAPI } from '~models/queryParams';

const getCfg = (signal?: AbortSignal): CacheRequestConfig => ({
  signal,
  ...getAxiosGithubSearchCacheConfig(),
});

const ident = (data: RepoApi[]): RepoApi[] => data;
const getCount = (data: SearchApi): number => data.total_count;

export class GithubReposAPI {
  private _api: AxiosCacheInstance;

  constructor() {
    this._api = createAxios(getAxiosGithubConfig());
  }

  private async _apiGet<T, R = T>(
    endpoint: keyof ReposEndpoints,
    orgName: string,
    config: CacheRequestConfig,
    empty: R,
    normalize: (x: T) => R
  ): Promise<R> {
    if (orgName.length === 0) return empty;
    const { data } = await this._api.request<T>({
      ...config,
      method: 'GET',
      url: reposEndpoints[endpoint](orgName),
    });
    return (data && normalize(data)) ?? empty;
  }

  getRepos(
    orgName: string,
    params: QueryParamsAPI,
    signal?: AbortSignal
  ): Promise<RepoApi[]> {
    return this._apiGet('repos', orgName, { signal, params }, [], ident);
  }

  checkOrg(orgName: string, signal?: AbortSignal): Promise<number> {
    return this._apiGet('checkOrg', orgName, getCfg(signal), 0, getCount);
  }

  getReposCount(orgName: string, signal?: AbortSignal): Promise<number> {
    return this._apiGet('reposCount', orgName, getCfg(signal), 0, getCount);
  }
}
