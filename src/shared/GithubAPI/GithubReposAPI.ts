import { RepoApi, SearchReposApi, SearchUsersApi } from '~/App/models/GitHub';
import { AxiosCacheInstance, createAxios } from '../axios-config';
import { getGithubAPIConfig } from './GithubAPI.config';

export type RequestReposParams = {
  type?: 'all' | 'public' | 'private' | 'forks' | 'sources' | 'member';
  sort?: 'created' | 'updated' | 'pushed' | 'full_name';
  direction?: 'asc' | 'desc';
  per_page: number;
  page: number;
};

export const defaultRequestReposParams: Required<RequestReposParams> = {
  type: 'all',
  sort: 'updated',
  direction: 'desc',
  per_page: 5,
  page: 1,
};

export class GithubReposAPI {
  private _api: AxiosCacheInstance;

  constructor() {
    this._api = createAxios(getGithubAPIConfig());
  }

  async getRepos(
    orgName: string,
    params: RequestReposParams,
    signal?: AbortSignal
  ): Promise<RepoApi[]> {
    if (orgName.length === 0) {
      return [];
    }
    const url = `/orgs/${orgName}/repos`;
    const config = {
      params: { ...defaultRequestReposParams, ...params },
      signal,
    };
    const { data } = await this._api.get<RepoApi[]>(url, config);
    return data;
  }

  async getReposCount(orgName: string, signal?: AbortSignal): Promise<number> {
    if (orgName.length === 0) {
      return 0;
    }
    const url = `/search/repositories`;
    const config = {
      params: { q: `org:${orgName}`, per_page: 1 },
      signal,
    };
    const { data } = await this._api.get<SearchReposApi>(url, config);
    return data.total_count;
  }

  async checkOrg(orgName: string, signal?: AbortSignal): Promise<number> {
    if (orgName.length === 0) {
      return 0;
    }
    const url = `/search/users?q=org:${orgName}+type:org`;
    const config = {
      signal,
    };
    const { data } = await this._api.get<SearchUsersApi>(url, config);
    return data.total_count;
  }
}
