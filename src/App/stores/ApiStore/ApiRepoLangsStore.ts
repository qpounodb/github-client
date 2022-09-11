import {
  normalizeRepoLangs,
  RepoLangsApi,
  RepoLangsModel,
} from '~/App/models/github';
import { GithubRepoAPI } from '~/shared/githubAPI';
import { ApiStore } from './ApiStore';

export class ApiRepoLangsStore extends ApiStore<
  {},
  RepoLangsApi,
  RepoLangsModel
> {
  constructor(_api: GithubRepoAPI) {
    super({
      fetch: () => _api.getLanguages(),
      normalize: normalizeRepoLangs,
    });
  }
}
