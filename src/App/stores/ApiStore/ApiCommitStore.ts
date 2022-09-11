import { CommitApi, CommitModel, normalizeCommit } from '~/App/models/github';
import { GithubRepoAPI } from '~/shared/githubAPI';
import { ApiStore } from './ApiStore';

export class ApiCommitStore extends ApiStore<{}, CommitApi, CommitModel> {
  constructor(_api: GithubRepoAPI) {
    super({
      fetch: () => _api.getCommit(),
      normalize: normalizeCommit,
    });
  }
}
