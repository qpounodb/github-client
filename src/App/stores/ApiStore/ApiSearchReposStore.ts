import { RepoApi } from '~/App/models/github';
import { GithubReposAPI } from '~/shared/githubAPI';

import { ApiSearchStore } from './ApiSearchStore';

export class ApiSearchReposStore extends ApiSearchStore<RepoApi> {
  constructor(_api: GithubReposAPI) {
    super(({ orgName }, signal) => _api.getReposCount(orgName, signal));
  }
}
