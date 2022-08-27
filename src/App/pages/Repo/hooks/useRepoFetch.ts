import React from 'react';
import {
  Branch,
  Commit,
  GithubRepoAPI,
  Languages,
  Readme,
  Repository,
} from '~/shared/GithubAPI';
import { Contributor } from '~/shared/GithubAPI/types';
import { isNone, Remap } from '~/shared/utils';

export type RepoDataState = {
  info: Repository | Error | null;
  branches: Branch[] | Error | null;
  contributors: Contributor[] | Error | null;
  commit: Commit | Error | null;
  langs: Languages | Error | null;
  readme: Readme | Error | null;
};

export type RepoLoadingState = Remap<RepoDataState, boolean>;

const initialDataState: RepoDataState = {
  info: null,
  branches: null,
  contributors: null,
  commit: null,
  langs: null,
  readme: null,
};

const initialLoadingState: RepoLoadingState = {
  info: true,
  branches: true,
  contributors: true,
  commit: true,
  langs: true,
  readme: true,
};

export const useRepoFetch = (orgName?: string, repoName?: string) => {
  const [loading, setLoading] = React.useState(initialLoadingState);
  const [data, setData] = React.useState<RepoDataState>(initialDataState);

  React.useEffect(() => {
    if (isNone(orgName) || isNone(repoName)) return;
    const githubRepoApi = new GithubRepoAPI(orgName, repoName);

    const step1 = githubRepoApi
      .getInfo()
      .then((info) => setData((state) => ({ ...state, info })))
      .catch((error) => setData((state) => ({ ...state, info: error })))
      .finally(() => setLoading((state) => ({ ...state, info: false })));

    const step2 = step1
      .then(() => githubRepoApi.getBranches())
      .then((branches) => setData((state) => ({ ...state, branches })))
      .catch((error) => setData((state) => ({ ...state, branches: error })))
      .finally(() => setLoading((state) => ({ ...state, branches: false })));

    const step3 = step2
      .then(() => githubRepoApi.getLanguages())
      .then((langs) => setData((state) => ({ ...state, langs })))
      .catch((error) => setData((state) => ({ ...state, langs: error })))
      .finally(() => setLoading((state) => ({ ...state, langs: false })));

    const step4 = step3
      .then(() => githubRepoApi.getContributors())
      .then((contributors) => setData((state) => ({ ...state, contributors })))
      .catch((error) => setData((state) => ({ ...state, contributors: error })))
      .finally(() =>
        setLoading((state) => ({ ...state, contributors: false }))
      );

    const step5 = step4
      .then(() => githubRepoApi.getCommit())
      .then((commit) => setData((state) => ({ ...state, commit })))
      .catch((error) => setData((state) => ({ ...state, commit: error })))
      .finally(() => setLoading((state) => ({ ...state, commit: false })));

    step5
      .then(() => githubRepoApi.getReadme())
      .then((readme) => setData((state) => ({ ...state, readme })))
      .catch((error) => setData((state) => ({ ...state, readme: error })))
      .finally(() => setLoading((state) => ({ ...state, readme: false })));

    // NOTE: Run effect once on component mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { loading, data };
};
