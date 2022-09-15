import type { GithubReposAPI } from '../api';

import { ApiSearchStore } from './ApiSearchStore';

export class ApiSearchUsersStore extends ApiSearchStore {
  constructor(api: GithubReposAPI) {
    super(api.checkOrg.bind(api));
  }
}
