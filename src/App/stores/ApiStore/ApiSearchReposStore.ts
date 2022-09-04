import { SearchReposApi } from '~/App/models/GitHub';
import { GithubReposAPI } from '~/shared/GithubAPI';
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
