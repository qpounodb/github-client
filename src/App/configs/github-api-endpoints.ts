import * as Github from '~models/github';

export type ReposApiRoute<T, R> = {
  getUrl: (orgName: string) => string;
  normalize: (from: T) => R;
};

export type RepoApiRoute<T, R> = {
  url: string;
  params?: { per_page?: number };
  normalize: (from: T) => R;
};

const getReposApiRoute = <T, R>(
  getUrl: (orgName: string) => string,
  normalize: (from: T) => R
): ReposApiRoute<T, R> => ({
  getUrl,
  normalize,
});

const getRepoApiRoute = <T, R>(
  url: string,
  normalize: (from: T) => R,
  per_page?: number
): RepoApiRoute<T, R> => ({
  url,
  params: { per_page },
  normalize,
});

const normalizeSearch = (data: Github.SearchApi): number => data.total_count;

export const reposApiEndpoints = {
  checkOrg: getReposApiRoute(
    (orgName) => `/search/users?q=org:${orgName}+type:org`,
    normalizeSearch
  ),
  reposCount: getReposApiRoute(
    (orgName) => `/search/repositories?q=org:${orgName}&per_page=1`,
    normalizeSearch
  ),
  repos: getReposApiRoute(
    (orgName) => `/orgs/${orgName}/repos`,
    Github.normalizeRepoCollection
  ),
};

export const getRepoEndpointsBase = (
  orgName: string,
  repoName: string
): string => `/repos/${orgName}/${repoName}`;

const MAX_PER_PAGE = 100;
const TOP_TEN = 10;

export const repoApiEndpoints = {
  info: getRepoApiRoute('', Github.normalizeRepo),
  branches: getRepoApiRoute(
    '/branches',
    Github.normalizeRepoBranchCollection,
    MAX_PER_PAGE
  ),
  commit: getRepoApiRoute(
    '/commits/HEAD',
    Github.normalizeCommit,
    MAX_PER_PAGE
  ),
  contributors: getRepoApiRoute(
    '/contributors',
    Github.normalizeRepoContributorCollection,
    TOP_TEN
  ),
  languages: getRepoApiRoute('/languages', Github.normalizeRepoLangs),
  readme: getRepoApiRoute('/readme', Github.normalizeRepoReadme),
};
