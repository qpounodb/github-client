import { CommitApi, CommitModel, normalizeCommit } from '~/App/models/github';
import { GithubRepoAPI } from '~/shared/githubAPI';

import { ApiStore } from './ApiStore';

export class ApiCommitStore extends ApiStore<unknown, CommitApi, CommitModel> {
  constructor(_api: GithubRepoAPI) {
    super({
      fetch: (_, signal) => _api.getCommit(signal),
      normalize: normalizeCommit,
    });
  }
}
