import { AxiosCacheInstance, createAxios } from '../axios-config';
import { Repository, SearchReposResult } from './types';

export type RequestReposParams = {
  type?: 'all' | 'public' | 'private' | 'forks' | 'sources' | 'member';
  sort?: 'created' | 'updated' | 'pushed' | 'full_name';
  direction?: 'asc' | 'desc';
  per_page?: number;
  page: number;
};

export const defaultRequestReposParams: Required<RequestReposParams> = {
  type: 'all',
  sort: 'updated',
  direction: 'desc',
  per_page: 10,
  page: 1,
};

export class GithubAPI {
  private fetch: AxiosCacheInstance;

  constructor(signal?: AbortSignal) {
    this.fetch = createAxios({
      baseURL: 'https://api.github.com',
      headers: {
        Accept: 'application/vnd.github+json',
      },
      timeout: 5000,
    });
  }

  async getRepos(
    orgName: string,
    params: RequestReposParams,
    signal?: AbortSignal
  ): Promise<Repository[]> {
    if (orgName.length === 0) {
      return [];
    }
    const url = `/orgs/${orgName}/repos`;
    const config = {
      params: { ...defaultRequestReposParams, ...params },
      signal,
    };
    const { data } = await this.fetch.get<Repository[]>(url, config);
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
    const { data } = await this.fetch.get<SearchReposResult>(url, config);
    return data.total_count;
  }
}
