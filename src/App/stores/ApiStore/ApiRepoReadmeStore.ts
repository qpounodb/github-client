import {
  normalizeRepoReadme,
  RepoReadmeApi,
  RepoReadmeModel,
} from '~/App/models/github';
import { GithubRepoAPI } from '~/shared/githubAPI';

import { ApiStore } from './ApiStore';

export class ApiRepoReadmeStore extends ApiStore<
  unknown,
  RepoReadmeApi,
  RepoReadmeModel
> {
  constructor(_api: GithubRepoAPI) {
    super({
      fetch: (_, signal) => _api.getReadme(signal),
      normalize: normalizeRepoReadme,
    });
  }
}
