import type { GithubReposAPI } from '../api';

import { ApiSearchStore } from './ApiSearchStore';

export class ApiSearchReposStore extends ApiSearchStore {
  constructor(api: GithubReposAPI) {
    super(api.getReposCount.bind(api));
  }
}
