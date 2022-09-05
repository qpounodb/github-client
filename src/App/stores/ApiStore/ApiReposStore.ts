import {
  normalizeRepoCollection,
  RepoApi,
  RepoModelCollection,
} from '~/App/models/GitHub';
import {
  defaultRequestReposParams,
  GithubReposAPI,
  OrderTypes,
  SortTypes,
} from '~/shared/GithubAPI';
import { ApiStore } from './ApiStore';

export type ReposQueryParams = {
  orgName: string;
  pageNum: number;
  sortType: SortTypes;
  orderType: OrderTypes;
};

export class ApiReposStore extends ApiStore<
  ReposQueryParams,
  RepoApi[],
  RepoModelCollection
> {
  constructor(_api: GithubReposAPI) {
    super({
      fetch: (
        { orgName, pageNum: page, sortType, orderType },
        signal: AbortSignal
      ) =>
        _api.getRepos(
          orgName,
          {
            ...defaultRequestReposParams,
            page,
            sort: sortType ?? 'updated',
            direction: orderType,
          },
          signal
        ),
      normalize: normalizeRepoCollection,
    });
  }
}
