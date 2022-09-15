import {
  normalizeRepoBranchCollection,
  RepoBranchApi,
  RepoBranchModelCollection,
} from '~/App/models/github';
import { GithubRepoAPI } from '~/shared/githubAPI';

import { ApiStore } from './ApiStore';

export class ApiRepoBranchesStore extends ApiStore<
  unknown,
  RepoBranchApi[],
  RepoBranchModelCollection
> {
  constructor(_api: GithubRepoAPI) {
    super({
      fetch: (_, signal) => _api.getBranches(signal),
      normalize: normalizeRepoBranchCollection,
    });
  }
}
