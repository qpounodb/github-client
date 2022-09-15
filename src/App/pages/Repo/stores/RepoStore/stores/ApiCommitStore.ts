import { CommitApi, CommitModel, normalizeCommit } from '~models/github';
import { ApiStore } from '~stores';

import type { GithubRepoAPI } from '../api';

export class ApiCommitStore extends ApiStore<unknown, CommitApi, CommitModel> {
  constructor(api: GithubRepoAPI) {
    super({
      fetch: (_, signal) => api.getCommit(signal),
      normalize: normalizeCommit,
    });
  }
}
