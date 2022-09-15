import {
  normalizeRepoContributorCollection,
  RepoContributorApi,
  RepoContributorModelCollection,
} from '~models/github';
import { ApiStore } from '~stores';

import type { GithubRepoAPI } from '../api';

export class ApiRepoContributorsStore extends ApiStore<
  unknown,
  RepoContributorApi[],
  RepoContributorModelCollection
> {
  constructor(api: GithubRepoAPI) {
    super({
      fetch: (_, signal) => api.getContributors(signal),
      normalize: normalizeRepoContributorCollection,
    });
  }
}
