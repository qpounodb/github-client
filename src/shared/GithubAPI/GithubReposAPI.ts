import { RepoApi, SearchReposApi, SearchUsersApi } from '~/App/models/GitHub';
import { SearchApi } from '~/App/models/GitHub/Search';
import { QueryParamsAPI } from '~/App/models/QueryParams';
import { AxiosCacheInstance, createAxios } from '../axios-config';
import { getGithubAPIConfig } from './GithubAPI.config';

const failSearchResults = <T>(): SearchApi<T> => ({
  total_count: 0,
  incomplete_results: false,
  items: [],
});

export class GithubReposAPI {
  private _api: AxiosCacheInstance;

  constructor() {
    this._api = createAxios(getGithubAPIConfig());
  }

  async getRepos(
    orgName: string,
    params: QueryParamsAPI,
    signal?: AbortSignal
  ): Promise<RepoApi[]> {
    if (orgName.length === 0) {
      return [];
    }
    const url = `/orgs/${orgName}/repos`;
    const config = { params, signal };
    const { data } = await this._api.get<RepoApi[]>(url, config);
    return data;
  }

  async getReposCount(
    orgName: string,
    signal?: AbortSignal
  ): Promise<SearchReposApi> {
    if (orgName.length === 0) {
      return failSearchResults();
    }
    const url = `/search/repositories?q=org:${orgName}&per_page=1`;
    const config = { signal };
    const { data } = await this._api.get<SearchReposApi>(url, config);
    return data;
  }

  async checkOrg(
    orgName: string,
    signal?: AbortSignal
  ): Promise<SearchUsersApi> {
    if (orgName.length === 0) {
      return failSearchResults();
    }
    const url = `/search/users?q=org:${orgName}+type:org`;
    const config = { signal };
    const { data } = await this._api.get<SearchUsersApi>(url, config);
    return data;
  }
}
