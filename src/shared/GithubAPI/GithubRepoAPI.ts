import {
  CommitApi,
  RepoApi,
  RepoBranchApi,
  RepoContributorApi,
  RepoLangsApi,
  RepoReadmeApi,
} from '~/App/models/GitHub';
import { AxiosCacheInstance, createAxios } from '../axios-config';
import { getGithubAPIConfig } from './GithubAPI.config';

export class GithubRepoAPI {
  private fetch: AxiosCacheInstance;
  private signal?: AbortSignal;

  constructor(orgName: string, repoName: string, signal?: AbortSignal) {
    this.signal = signal;
    this.fetch = createAxios(
      getGithubAPIConfig(`/repos/${orgName}/${repoName}`)
    );
  }

  private getCfg(params?: Record<string, number | string>) {
    return {
      signal: this.signal,
      params,
    };
  }

  async getInfo(): Promise<RepoApi> {
    const cfg = this.getCfg();
    const { data } = await this.fetch.get<RepoApi>('', cfg);
    return data;
  }

  async getBranches(): Promise<RepoBranchApi[]> {
    const cfg = this.getCfg({ per_page: 100 });
    const { data } = await this.fetch.get<RepoBranchApi[]>('/branches', cfg);
    return data;
  }

  async getCommit(ref = 'HEAD'): Promise<CommitApi> {
    const cfg = this.getCfg({ per_page: 100 });
    const { data } = await this.fetch.get<CommitApi>(`/commits/${ref}`, cfg);
    return data;
  }

  async getContributors(): Promise<RepoContributorApi[]> {
    const cfg = this.getCfg({ per_page: 10 });
    const { data } = await this.fetch.get<RepoContributorApi[]>(
      '/contributors',
      cfg
    );
    return data;
  }

  async getLanguages(): Promise<RepoLangsApi> {
    const cfg = this.getCfg();
    const { data } = await this.fetch.get<RepoLangsApi>('/languages', cfg);
    return data;
  }

  async getReadme(): Promise<RepoReadmeApi> {
    const cfg = this.getCfg();
    const { data } = await this.fetch.get<RepoReadmeApi>('/readme', cfg);
    return data;
  }
}
