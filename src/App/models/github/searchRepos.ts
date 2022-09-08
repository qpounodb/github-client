import { normalizeRepoCollection, RepoApi, RepoModel } from './repo';
import { normalizeSearch, SearchApi, SearchModel } from './Search';

export type SearchReposApi = SearchApi<RepoApi>;

export type SearchReposModel = SearchModel<'id', RepoModel>;

export const normalizeSearchRepos = (from: SearchReposApi): SearchReposModel =>
  normalizeSearch(from, normalizeRepoCollection);
