import {
  normalizeRepoContributorCollection,
  RepoContributorApi,
  RepoContributorModelCollection,
} from '~/App/models/github';
import { GithubRepoAPI } from '~/shared/githubAPI';

import { ApiStore } from './ApiStore';

export class ApiRepoContributorsStore extends ApiStore<
  unknown,
  RepoContributorApi[],
  RepoContributorModelCollection
> {
  constructor(_api: GithubRepoAPI) {
    super({
      fetch: (_, signal) => _api.getContributors(signal),
      normalize: normalizeRepoContributorCollection,
    });
  }
}
