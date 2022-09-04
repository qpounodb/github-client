import {
  normalizeRepoContributorCollection,
  RepoContributorApi,
  RepoContributorModelCollection,
} from '~/App/models/GitHub';
import { GithubRepoAPI } from '~/shared/GithubAPI';
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
