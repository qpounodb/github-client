import { AxiosCacheInstance, createAxios } from '~configs/axios-cache';
import { getAxiosGithubConfig } from '~configs/axios-github';
import { RepoEndpoints, repoEndpoints } from '~configs/github-api-endpoints';
import type {
  CommitApi,
  RepoApi,
  RepoBranchApi,
  RepoContributorApi,
  RepoLangsApi,
  RepoReadmeApi,
} from '~models/github';
import { isSome } from '~utils';

const MAX_PER_PAGE = 100;
const TOP_TEN = 10;

export class GithubRepoAPI {
  private _api: AxiosCacheInstance;

  constructor(orgName: string, repoName: string) {
    this._api = createAxios(
      getAxiosGithubConfig(repoEndpoints.base(orgName, repoName))
    );
  }

  private async _apiGet<T>(
    endpoint: keyof Omit<RepoEndpoints, 'base'>,
    signal?: AbortSignal,
    perPage?: number
  ): Promise<T> {
    const { data } = await this._api.request<T>({
      method: 'GET',
      url: repoEndpoints[endpoint],
      signal,
      params: isSome(perPage) ? { per_page: perPage } : {},
    });
    return data;
  }

  getInfo(signal?: AbortSignal): Promise<RepoApi> {
    return this._apiGet('info', signal);
  }

  getBranches(signal?: AbortSignal): Promise<RepoBranchApi[]> {
    return this._apiGet('branches', signal, MAX_PER_PAGE);
  }

  getCommit(signal?: AbortSignal): Promise<CommitApi> {
    return this._apiGet('commit', signal, MAX_PER_PAGE);
  }

  getContributors(signal?: AbortSignal): Promise<RepoContributorApi[]> {
    return this._apiGet('contributors', signal, TOP_TEN);
  }

  getLanguages(signal?: AbortSignal): Promise<RepoLangsApi> {
    return this._apiGet('languages', signal);
  }

  getReadme(signal?: AbortSignal): Promise<RepoReadmeApi> {
    return this._apiGet('readme', signal);
  }
}
