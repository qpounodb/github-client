import axios, { AxiosInstance } from 'axios';
import { Repository, SearchReposResult } from './types';

export type RequestReposParams = {
  type?: 'all' | 'public' | 'private' | 'forks' | 'sources' | 'member';
  sort?: 'created' | 'updated' | 'pushed' | 'full_name';
  direction?: 'asc' | 'desc';
  per_page: number;
  page: number;
};

const defaultRequestReposParams = { per_page: 10 };

class GithubAPI {
  private fetch: AxiosInstance;

  constructor() {
    this.fetch = axios.create({
      baseURL: 'https://api.github.com',
      headers: {
        Accept: 'application/vnd.github+json',
      },
      timeout: 5000,
    });
  }

  async getRepos(
    orgName: string,
    params: RequestReposParams
  ): Promise<Repository[]> {
    if (orgName.length === 0) {
      return Promise.resolve([]);
    }
    const { data } = await this.fetch.get<Repository[]>(
      `/orgs/${orgName}/repos`,
      {
        params: { ...defaultRequestReposParams, ...params },
      }
    );
    return data;
  }

  async getRepo(orgName: string, repoName: string): Promise<Repository> {
    if (orgName.length === 0 || repoName.length === 0) {
      return Promise.reject(new Error(''));
    }
    const { data } = await this.fetch.get<Repository>(
      `/repos/${orgName}/${repoName}`
    );
    return data;
  }

  async getReposCount(orgName: string): Promise<number> {
    if (orgName.length === 0) {
      return Promise.resolve(0);
    }
    const { data } = await this.fetch.get<SearchReposResult>(
      `/search/repositories`,
      {
        params: { q: `org:${orgName}`, per_page: 1 },
      }
    );
    return data.total_count;
  }
}

export const githubAPI = new GithubAPI();
