import {
  normalizeRepoOwnerCollection,
  RepoOwnerApi,
  RepoOwnerModel,
} from './RepoOwner';
import { normalizeSearch, SearchApi, SearchModel } from './Search';

export type SearchUsersApi = SearchApi<RepoOwnerApi>;

export type SearchUsersModel = SearchModel<'id', RepoOwnerModel>;

export const normalizeSearchUsers = (from: SearchUsersApi): SearchUsersModel =>
  normalizeSearch(from, normalizeRepoOwnerCollection);
