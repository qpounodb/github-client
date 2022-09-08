import { SearchReposApi } from '~/App/models/github';
import { GithubReposAPI } from '~/shared/githubAPI';
import { ApiStore } from './ApiStore';

type FetchParams = { orgName: string };

export class ApiSearchReposStore extends ApiStore<FetchParams, SearchReposApi> {
  constructor(_api: GithubReposAPI) {
    super({
      fetch: ({ orgName }, signal: AbortSignal) =>
        _api.getReposCount(orgName, signal),
      normalize: (x) => x,
    });
  }
}
