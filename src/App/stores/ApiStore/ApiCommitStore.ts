import { CommitApi, CommitModel, normalizeCommit } from '~/App/models/GitHub';
import { GithubRepoAPI } from '~/shared/GithubAPI';
import { ApiStore } from './ApiStore';

export class ApiCommitStore extends ApiStore<{}, CommitApi, CommitModel> {
  constructor(_api: GithubRepoAPI) {
    super({
      fetch: () => _api.getCommit(),
      normalize: normalizeCommit,
    });
  }
}
