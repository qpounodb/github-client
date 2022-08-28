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
import { isNone, toError } from '~/shared/utils';

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
  (
    setState: React.Dispatch<React.SetStateAction<RepoDataState>>,
    delay: number,
    controller: AbortController
  ) =>
  async <K extends keyof RepoDataState>(
    prop: K,
    fetch: () => Promise<RepoDataState[K]['data']>
  ): Promise<void> => {
    if (controller.signal.aborted) {
      setState(updateRepoDataState(prop, false));
      return;
    }
    try {
      const data = await fetch();
      setState(updateRepoDataState(prop, data));
      // NOTE: The Github API has a rate limit, so slow down next requests
      // await sleep(delay);
    } catch (error) {
      if (!controller.signal.aborted) {
        setState(updateRepoDataState(prop, toError(error)));
        controller.abort();
      }
    } finally {
      setState(updateRepoDataState(prop, false));
    }
  };

export const useRepoFetch = (
  orgName?: string,
  repoName?: string
): RepoDataState => {
  const [state, setState] = React.useState<RepoDataState>(initialRepoDataState);

  React.useEffect(() => {
    if (isNone(orgName) || isNone(repoName)) return;
    setState(() => initialRepoDataState);

    const controller = new AbortController();
    const handleFetch = handleStateFetch(setState, 1000, controller);

    const githubRepoApi = new GithubRepoAPI(
      orgName,
      repoName,
      controller.signal
    );

    (async () => {
      await handleFetch('info', () => githubRepoApi.getInfo());
      // await handleFetch('branches', () => githubRepoApi.getBranches());
      await handleFetch('langs', () => githubRepoApi.getLanguages());
      await handleFetch('contributors', () => githubRepoApi.getContributors());
      await handleFetch('commit', () => githubRepoApi.getCommit());
      // await handleFetch('readme', () => githubRepoApi.getReadme());
    })();

    return () => {
      controller.abort();
    };
    // NOTE: Run effect once on component mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return state;
};
