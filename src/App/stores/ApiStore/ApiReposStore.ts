import {
  normalizeRepoCollection,
  RepoApi,
  RepoModelCollection,
} from '~/App/models/GitHub';
import { appParamsToApiParams, QueryParamsApp } from '~/App/models/QueryParams';
import { GithubReposAPI } from '~/shared/GithubAPI';
import { ApiStore } from './ApiStore';

export class ApiReposStore extends ApiStore<
  QueryParamsApp,
  RepoApi[],
  RepoModelCollection
> {
  constructor(_api: GithubReposAPI) {
    super({
      fetch: (params, signal: AbortSignal) =>
        _api.getRepos(
          params.orgName ?? '',
          appParamsToApiParams(params),
          signal
        ),
      normalize: normalizeRepoCollection,
    });
  }
}
