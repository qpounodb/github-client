import {
  normalizeRepoBranchCollection,
  RepoBranchApi,
  RepoBranchModelCollection,
} from '~models/github';
import { ApiStore } from '~stores';

import type { GithubRepoAPI } from '../api';

export class ApiRepoBranchesStore extends ApiStore<
  unknown,
  RepoBranchApi[],
  RepoBranchModelCollection
> {
  constructor(api: GithubRepoAPI) {
    super({
      fetch: (_, signal) => api.getBranches(signal),
      normalize: normalizeRepoBranchCollection,
    });
  }
}
