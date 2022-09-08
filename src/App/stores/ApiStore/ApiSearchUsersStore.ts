import { SearchUsersApi } from '~/App/models/github';
import { GithubReposAPI } from '~/shared/githubAPI';
import { ApiStore } from './ApiStore';

type FetchParams = { orgName: string };

export class ApiSearchUsersStore extends ApiStore<FetchParams, SearchUsersApi> {
  constructor(_api: GithubReposAPI) {
    super({
      fetch: ({ orgName }, signal: AbortSignal) =>
        _api.checkOrg(orgName, signal),
      normalize: (x) => x,
    });
  }
}
