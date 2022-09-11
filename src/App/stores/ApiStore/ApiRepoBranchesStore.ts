import {
  normalizeRepoBranchCollection,
  RepoBranchApi,
  RepoBranchModelCollection,
} from '~/App/models/github';
import { GithubRepoAPI } from '~/shared/githubAPI';
import { ApiStore } from './ApiStore';

export class ApiRepoBranchesStore extends ApiStore<
  {},
  RepoBranchApi[],
  RepoBranchModelCollection
> {
  constructor(_api: GithubRepoAPI) {
    super({
      fetch: () => _api.getBranches(),
      normalize: normalizeRepoBranchCollection,
    });
  }
}
