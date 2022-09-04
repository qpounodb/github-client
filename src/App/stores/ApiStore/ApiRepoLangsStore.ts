import {
  normalizeRepoLangs,
  RepoLangsApi,
  RepoLangsModel,
} from '~/App/models/GitHub';
import { GithubRepoAPI } from '~/shared/GithubAPI';
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
