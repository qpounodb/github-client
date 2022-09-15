import {
  normalizeRepoCollection,
  RepoApi,
  RepoModelCollection,
} from '~models/github';
import { appParamsToApiParams, QueryParamsApp } from '~models/queryParams';
import { ApiStore } from '~stores';

import { GithubReposAPI } from '../api';

export class ApiReposStore extends ApiStore<
  QueryParamsApp,
  RepoApi[],
  RepoModelCollection
> {
  constructor(api: GithubReposAPI) {
    super({
      fetch: (params, signal: AbortSignal) =>
        api.getRepos(
          params.orgName ?? '',
          appParamsToApiParams(params),
          signal
        ),
      normalize: normalizeRepoCollection,
    });
  }
}
