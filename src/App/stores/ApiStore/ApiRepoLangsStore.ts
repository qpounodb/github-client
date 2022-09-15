import {
  normalizeRepoLangs,
  RepoLangsApi,
  RepoLangsModel,
} from '~/App/models/github';
import { GithubRepoAPI } from '~/shared/githubAPI';

import { ApiStore } from './ApiStore';

export class ApiRepoLangsStore extends ApiStore<
  unknown,
  RepoLangsApi,
  RepoLangsModel
> {
  constructor(_api: GithubRepoAPI) {
    super({
      fetch: (_, signal) => _api.getLanguages(signal),
      normalize: normalizeRepoLangs,
    });
  }
}
