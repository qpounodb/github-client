import {
  CommitApi,
  RepoApi,
  RepoBranchApi,
  RepoContributorApi,
  RepoLangsApi,
  RepoReadmeApi,
} from '~/App/models/github';

import { AxiosCacheInstance, createAxios } from '../axios-config';

import { getConfig } from './config';

export class GithubRepoAPI {
  private fetch: AxiosCacheInstance;

  constructor(orgName: string, repoName: string) {
    this.fetch = createAxios(getConfig(`/repos/${orgName}/${repoName}`));
  }

  private getCfg(
    params?: Record<string, number | string>,
    signal?: AbortSignal
  ) {
    return {
      signal,
      params,
    };
  }

  async getInfo(signal?: AbortSignal): Promise<RepoApi> {
    const cfg = this.getCfg({}, signal);
    const { data } = await this.fetch.get<RepoApi>('', cfg);
    return data;
  }

  async getBranches(signal?: AbortSignal): Promise<RepoBranchApi[]> {
    const cfg = this.getCfg({ per_page: 100 }, signal);
    const { data } = await this.fetch.get<RepoBranchApi[]>('/branches', cfg);
    return data;
  }

  async getCommit(signal?: AbortSignal): Promise<CommitApi> {
    const cfg = this.getCfg({ per_page: 100 }, signal);
    const { data } = await this.fetch.get<CommitApi>(`/commits/HEAD`, cfg);
    return data;
  }

  async getContributors(signal?: AbortSignal): Promise<RepoContributorApi[]> {
    const cfg = this.getCfg({ per_page: 10 }, signal);
    const { data } = await this.fetch.get<RepoContributorApi[]>(
      '/contributors',
      cfg
    );
    return data;
  }

  async getLanguages(signal?: AbortSignal): Promise<RepoLangsApi> {
    const cfg = this.getCfg({}, signal);
    const { data } = await this.fetch.get<RepoLangsApi>('/languages', cfg);
    return data;
  }

  async getReadme(signal?: AbortSignal): Promise<RepoReadmeApi> {
    const cfg = this.getCfg({}, signal);
    const { data } = await this.fetch.get<RepoReadmeApi>('/readme', cfg);
    return data;
  }
}
