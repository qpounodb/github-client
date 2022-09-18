import { AxiosRequestConfig } from 'axios';

import { AxiosCacheInstance, createAxios } from '~configs/axios-cache';
import { getAxiosGithubConfig } from '~configs/axios-github';
import {
  getRepoEndpointsBase,
  repoApiEndpoints,
  RepoApiRoute,
} from '~configs/github-api-endpoints';
import * as Github from '~models/github';
import { isCanceledError, not, toError } from '~utils';

type RepoApiEndpoints = typeof repoApiEndpoints;
type Endpoints = keyof RepoApiEndpoints;
type RepoApiNormalize<K extends Endpoints> = RepoApiEndpoints[K]['normalize'];
type RepoApiData<K extends Endpoints> = ReturnType<RepoApiNormalize<K>>;

export type RepoApiDataMap = { [K in Endpoints]: null | RepoApiData<K> };

export type RepoApiResult = {
  dataMap: null | RepoApiDataMap;
  errors: Error[];
};

const getValue = <T>(result: PromiseSettledResult<T>): T | null => {
  return result.status === 'fulfilled' ? result.value : null;
};

const isRejected = (
  x: PromiseSettledResult<unknown>
): x is PromiseRejectedResult => {
  return x.status === 'rejected';
};

export class GithubRepoApi {
  private _api: AxiosCacheInstance;

  constructor(orgName: string, repoName: string) {
    this._api = createAxios(
      getAxiosGithubConfig(getRepoEndpointsBase(orgName, repoName))
    );
  }

  async _apiGet<T, R>(
    route: RepoApiRoute<T, R>,
    signal: AbortSignal
  ): Promise<null | R> {
    const { normalize, url, params } = route;
    const cfg: AxiosRequestConfig = { method: 'GET', url, params, signal };
    const { data } = await this._api.request<T | null>(cfg);
    return data && normalize(data);
  }

  getInfo(signal: AbortSignal): Promise<null | Github.RepoModel> {
    return this._apiGet(repoApiEndpoints.info, signal);
  }

  getBranches(
    signal: AbortSignal
  ): Promise<null | Github.RepoBranchModelCollection> {
    return this._apiGet(repoApiEndpoints.branches, signal);
  }

  getCommit(signal: AbortSignal): Promise<null | Github.CommitModel> {
    return this._apiGet(repoApiEndpoints.commit, signal);
  }

  getContributors(
    signal: AbortSignal
  ): Promise<null | Github.RepoContributorModelCollection> {
    return this._apiGet(repoApiEndpoints.contributors, signal);
  }

  getLanguages(signal: AbortSignal): Promise<null | Github.RepoLangsModel> {
    return this._apiGet(repoApiEndpoints.languages, signal);
  }

  getReadme(signal: AbortSignal): Promise<null | string> {
    return this._apiGet(repoApiEndpoints.readme, signal);
  }

  async getAll(signal: AbortSignal): Promise<RepoApiResult> {
    const dataArray = await Promise.allSettled([
      this.getInfo(signal),
      this.getBranches(signal),
      this.getCommit(signal),
      this.getContributors(signal),
      this.getLanguages(signal),
      this.getReadme(signal),
    ]);

    const [info, branches, commit, contributors, languages, readme] = dataArray;

    const errors = dataArray
      .filter(isRejected)
      .map((x) => toError(x.reason))
      .filter(not(isCanceledError));

    return {
      errors,
      dataMap: {
        info: getValue(info),
        branches: getValue(branches),
        commit: getValue(commit),
        contributors: getValue(contributors),
        languages: getValue(languages),
        readme: getValue(readme),
      },
    };
  }
}
