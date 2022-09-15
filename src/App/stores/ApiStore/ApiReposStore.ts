import {
  normalizeRepoCollection,
  RepoApi,
  RepoModelCollection,
} from '~/App/models/github';
import { appParamsToApiParams, QueryParamsApp } from '~/App/models/queryParams';
import { GithubReposAPI } from '~/shared/githubAPI';

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
