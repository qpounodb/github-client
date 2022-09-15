import {
  normalizeRepoLangs,
  RepoLangsApi,
  RepoLangsModel,
} from '~models/github';
import { ApiStore } from '~stores';

import type { GithubRepoAPI } from '../api';

export class ApiRepoLangsStore extends ApiStore<
  unknown,
  RepoLangsApi,
  RepoLangsModel
> {
  constructor(api: GithubRepoAPI) {
    super({
      fetch: (_, signal) => api.getLanguages(signal),
      normalize: normalizeRepoLangs,
    });
  }
}
