import { RepoOwnerApi } from '~/App/models/github';
import { GithubReposAPI } from '~/shared/githubAPI';
import { ApiSearchStore } from './ApiSearchStore';

export class ApiSearchUsersStore extends ApiSearchStore<RepoOwnerApi> {
  constructor(_api: GithubReposAPI) {
    super(({ orgName }, signal) => _api.checkOrg(orgName, signal));
  }
}
