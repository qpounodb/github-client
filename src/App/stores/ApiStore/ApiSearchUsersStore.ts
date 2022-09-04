import { SearchUsersApi } from '~/App/models/GitHub';
import { GithubReposAPI } from '~/shared/GithubAPI';
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
