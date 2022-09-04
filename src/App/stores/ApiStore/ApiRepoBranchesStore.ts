import {
  normalizeRepoBranchCollection,
  RepoBranchApi,
  RepoBranchModelCollection,
} from '~/App/models/GitHub';
import { GithubRepoAPI } from '~/shared/GithubAPI';
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
