import {
  normalizeRepoReadme,
  RepoReadmeApi,
  RepoReadmeModel,
} from '~models/github';
import { ApiStore } from '~stores';

import type { GithubRepoAPI } from '../api';

export class ApiRepoReadmeStore extends ApiStore<
  unknown,
  RepoReadmeApi,
  RepoReadmeModel
> {
  constructor(api: GithubRepoAPI) {
    super({
      fetch: (_, signal) => api.getReadme(signal),
      normalize: normalizeRepoReadme,
    });
  }
}
