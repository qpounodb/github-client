export type ReposEndpoints = {
  checkOrg: (orgName: string) => string;
  reposCount: (orgName: string) => string;
  repos: (orgName: string) => string;
};

export const reposEndpoints: ReposEndpoints = {
  checkOrg: (orgName) => `/search/users?q=org:${orgName}+type:org`,
  reposCount: (orgName) => `/search/repositories?q=org:${orgName}&per_page=1`,
  repos: (orgName) => `/orgs/${orgName}/repos`,
};

export type RepoEndpoints = {
  base: (orgName: string, repoName: string) => string;
  info: string;
  branches: string;
  commit: string;
  contributors: string;
  languages: string;
  readme: string;
};

export const repoEndpoints: RepoEndpoints = {
  base: (orgName, repoName) => `/repos/${orgName}/${repoName}`,
  info: '',
  branches: '/branches',
  commit: '/commits/HEAD',
  contributors: '/contributors',
  languages: '/languages',
  readme: '/readme',
};
