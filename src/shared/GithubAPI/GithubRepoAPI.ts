import { AxiosCacheInstance, createAxios } from '../axios-config';
import { assertNotEmpty } from '../utils';
import {
  Branch,
  Commit,
  Contributor,
  Languages,
  Readme,
  Repository,
} from './types';

export class GithubRepoAPI {
  private fetch: AxiosCacheInstance;
  private signal?: AbortSignal;

  constructor(orgName: string, repoName: string, signal?: AbortSignal) {
    assertNotEmpty(orgName);
    assertNotEmpty(repoName);
    this.signal = signal;

    this.fetch = createAxios({
      baseURL: `https://api.github.com/repos/${orgName}/${repoName}`,
      headers: {
        Accept: 'application/vnd.github+json',
      },
      timeout: 5000,
    });
  }

  private getCfg(params?: Record<string, number | string>) {
    return {
      signal: this.signal,
      params,
    };
  }

  async getInfo(): Promise<Repository> {
    const cfg = this.getCfg();
    const { data } = await this.fetch.get<Repository>('', cfg);
    return data;
  }

  async getBranches(): Promise<Branch[]> {
    const cfg = this.getCfg({ per_page: 100 });
    const { data } = await this.fetch.get<Branch[]>('/branches', cfg);
    return data;
  }

  async getCommit(ref = 'HEAD'): Promise<Commit> {
    const cfg = this.getCfg({ per_page: 100 });
    const { data } = await this.fetch.get<Commit>(`/commits/${ref}`, cfg);
    return data;
  }

  async getContributors(): Promise<Contributor[]> {
    const cfg = this.getCfg({ per_page: 10 });
    const { data } = await this.fetch.get<Contributor[]>('/contributors', cfg);
    return data;
  }

  async getLanguages(): Promise<Languages> {
    const cfg = this.getCfg();
    const { data } = await this.fetch.get<Languages>('/languages', cfg);
    return data;
  }

  async getReadme(): Promise<Readme> {
    const cfg = this.getCfg();
    const { data } = await this.fetch.get<Readme>('/readme', cfg);
    return data;
  }
}
