import React from 'react';
import { DataState, getDataState, updateDataState } from '~/shared/data-state';
import {
  Branch,
  Commit,
  GithubRepoAPI,
  Languages,
  Readme,
  Repository,
} from '~/shared/GithubAPI';
import { Contributor } from '~/shared/GithubAPI/types';
import { isNone, sleep } from '~/shared/utils';

export type RepoDataState = {
  info: DataState<Repository>;
  branches: DataState<Branch[]>;
  contributors: DataState<Contributor[]>;
  commit: DataState<Commit>;
  langs: DataState<Languages>;
  readme: DataState<Readme>;
};

export const getInitialDataState = <T extends object>(): DataState<T> =>
  getDataState<T>(true);

const initialRepoDataState: RepoDataState = {
  info: getInitialDataState(),
  branches: getInitialDataState(),
  contributors: getInitialDataState(),
  commit: getInitialDataState(),
  langs: getInitialDataState(),
  readme: getInitialDataState(),
};

const updateRepoDataState =
  <K extends keyof RepoDataState>(
    prop: K,
    value: boolean | Error | RepoDataState[K]['data']
  ) =>
  (state: RepoDataState): RepoDataState => {
    return { ...state, [prop]: updateDataState(value)(state[prop]) };
  };

const handleStateFetch =
  (setState: React.Dispatch<React.SetStateAction<RepoDataState>>) =>
  async <K extends keyof RepoDataState>(
    prop: K,
    fetch: () => Promise<RepoDataState[K]['data']>
  ): Promise<void> => {
    try {
      const data = await fetch();
      return setState(updateRepoDataState(prop, data));
    } catch (error) {
      const err = error instanceof Error ? error : new Error('Unknown error');
      return setState(updateRepoDataState(prop, err));
    } finally {
      return setState(updateRepoDataState(prop, false));
    }
  };

export const useRepoFetch = (
  orgName?: string,
  repoName?: string
): RepoDataState => {
  const [state, setState] = React.useState<RepoDataState>(initialRepoDataState);
  const handleFetch = handleStateFetch(setState);

  React.useEffect(() => {
    if (isNone(orgName) || isNone(repoName)) return;
    const githubRepoApi = new GithubRepoAPI(orgName, repoName);

    // NOTE: The Github API has a rate limit, so slow down requests
    const delay = 1000;

    (async () => {
      await handleFetch('info', () => githubRepoApi.getInfo());
      await sleep(delay);
      await handleFetch('branches', () => githubRepoApi.getBranches());
      await sleep(delay);
      await handleFetch('langs', () => githubRepoApi.getLanguages());
      await sleep(delay);
      await handleFetch('contributors', () => githubRepoApi.getContributors());
      await sleep(delay);
      await handleFetch('commit', () => githubRepoApi.getCommit());
      await sleep(delay);
      await handleFetch('readme', () => githubRepoApi.getReadme());
      await sleep(delay);
    })();

    // NOTE: Run effect once on component mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return state;
};
