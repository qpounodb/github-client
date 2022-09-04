import {
  normalizeRepoCollection,
  RepoApi,
  RepoModelCollection,
} from '~/App/models/GitHub';
import { defaultRequestReposParams, GithubReposAPI } from '~/shared/GithubAPI';
import { ApiStore } from './ApiStore';

type FetchParams = { orgName: string; page: number };

export class ApiReposStore extends ApiStore<
  FetchParams,
  RepoApi[],
  RepoModelCollection
> {
  constructor(_api: GithubReposAPI) {
    super({
      fetch: ({ orgName, page }, signal: AbortSignal) =>
        _api.getRepos(orgName, { ...defaultRequestReposParams, page }, signal),
      normalize: normalizeRepoCollection,
    });
  }
}
