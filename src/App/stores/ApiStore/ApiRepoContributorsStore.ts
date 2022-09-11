import {
  normalizeRepoContributorCollection,
  RepoContributorApi,
  RepoContributorModelCollection,
} from '~/App/models/github';
import { GithubRepoAPI } from '~/shared/githubAPI';
import { ApiStore } from './ApiStore';

export class ApiRepoContributorsStore extends ApiStore<
  {},
  RepoContributorApi[],
  RepoContributorModelCollection
> {
  constructor(_api: GithubRepoAPI) {
    super({
      fetch: () => _api.getContributors(),
      normalize: normalizeRepoContributorCollection,
    });
  }
}
