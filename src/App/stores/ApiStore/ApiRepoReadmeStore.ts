import {
  normalizeRepoReadme,
  RepoReadmeApi,
  RepoReadmeModel,
} from '~/App/models/GitHub';
import { GithubRepoAPI } from '~/shared/GithubAPI';
import { ApiStore } from './ApiStore';

export class ApiRepoReadmeStore extends ApiStore<
  {},
  RepoReadmeApi,
  RepoReadmeModel
> {
  constructor(_api: GithubRepoAPI) {
    super({
      fetch: () => _api.getReadme(),
      normalize: normalizeRepoReadme,
    });
  }
}
