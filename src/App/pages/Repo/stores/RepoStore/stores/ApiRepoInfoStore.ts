import { normalizeRepo, RepoApi, RepoModel } from '~models/github';
import { ApiStore } from '~stores';

import type { GithubRepoAPI } from '../api';

export class ApiRepoInfoStore extends ApiStore<unknown, RepoApi, RepoModel> {
  constructor(api: GithubRepoAPI) {
    super({
      fetch: (_, signal) => api.getInfo(signal),
      normalize: normalizeRepo,
    });
  }
}
