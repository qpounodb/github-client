import axios, { AxiosInstance } from 'axios';
import { assertNotEmpty } from '../utils';
import { Branch, Commit, Languages, Owner, Repository, Topics } from './types';

export class GithubRepoAPI {
  private fetch: AxiosInstance;

  constructor(orgName: string, repoName: string) {
    assertNotEmpty(orgName);
    assertNotEmpty(repoName);
    this.fetch = axios.create({
      baseURL: `https://api.github.com/repos/${orgName}/${repoName}`,
      headers: {
        Accept: 'application/vnd.github+json',
      },
      timeout: 5000,
    });
  }

  private readonly cfg = { params: { per_page: 100 } };

  async getInfo(): Promise<Repository> {
    const { data } = await this.fetch.get<Repository>('');
    return data;
  }

  async getBranches(): Promise<Branch[]> {
    const { data } = await this.fetch.get<Branch[]>('/branches', this.cfg);
    return data;
  }

  async getCommit(ref = 'HEAD'): Promise<Commit> {
    const { data } = await this.fetch.get<Commit>(`/commits/${ref}`, this.cfg);
    return data;
  }

  async getContributors(): Promise<Owner[]> {
    const { data } = await this.fetch.get<Owner[]>('/contributors', this.cfg);
    return data;
  }

  async getLanguages(): Promise<Languages> {
    const { data } = await this.fetch.get<Languages>('/languages');
    return data;
  }

  async getTopics(): Promise<Topics> {
    const { data } = await this.fetch.get<Topics>('/topics', this.cfg);
    return data;
  }
}
