import { normalizeRepo, RepoApi, RepoModel } from '~/App/models/github';
import { GithubRepoAPI } from '~/shared/githubAPI';

import { ApiStore } from './ApiStore';

export class ApiRepoInfoStore extends ApiStore<unknown, RepoApi, RepoModel> {
  constructor(_api: GithubRepoAPI) {
    super({
      fetch: (_, signal) => _api.getInfo(signal),
      normalize: normalizeRepo,
    });
  }
}
