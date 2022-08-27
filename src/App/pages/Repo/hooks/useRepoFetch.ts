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

    githubRepoApi
      .getInfo()
      .then((info) => setData((state) => ({ ...state, info })))
      .catch((error) => setData((state) => ({ ...state, info: error })))
      .finally(() => setLoading((state) => ({ ...state, info: false })));

    // NOTE: Run effect once on component mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { loading, data };
};
