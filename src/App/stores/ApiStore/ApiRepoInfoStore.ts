import { normalizeRepo, RepoApi, RepoModel } from '~/App/models/GitHub';
import { GithubRepoAPI } from '~/shared/GithubAPI';
import { ApiStore } from './ApiStore';

export class ApiRepoInfoStore extends ApiStore<{}, RepoApi, RepoModel> {
  constructor(_api: GithubRepoAPI) {
    super({
      fetch: () => _api.getInfo(),
      normalize: normalizeRepo,
    });
  }
}
