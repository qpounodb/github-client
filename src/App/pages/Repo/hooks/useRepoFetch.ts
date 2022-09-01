import React from 'react';
import {
  CommitModel,
  normalizeCommit,
  normalizeRepo,
  normalizeRepoBranchCollection,
  normalizeRepoContributorCollection,
  normalizeRepoLangs,
  normalizeRepoReadme,
  RepoBranchModelCollection,
  RepoContributorModelCollection,
  RepoLangsModel,
  RepoModel,
  RepoReadmeModel,
} from '~/App/models/GitHub';
import { GithubRepoAPI } from '~/shared/GithubAPI';
import { DataState } from '~/shared/types';
import { getDataState, isNone, toError, updateDataState } from '~/shared/utils';

export type RepoDataState = {
  info: DataState<RepoModel>;
  branches: DataState<RepoBranchModelCollection>;
  contributors: DataState<RepoContributorModelCollection>;
  commit: DataState<CommitModel>;
  langs: DataState<RepoLangsModel>;
  readme: DataState<RepoReadmeModel>;
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

type Action<K extends keyof RepoDataState> =
  | {
      type: K;
      payload: boolean | Error | RepoDataState[K]['data'];
    }
  | { type: 'reset'; payload?: never };

const reducer = <K extends keyof RepoDataState>(
  state: RepoDataState,
  { type, payload }: Action<K>
) => {
  if (type === 'reset') return initialRepoDataState;
  return { ...state, [type]: updateDataState(payload)(state[type]) };
};

const handleDispatchFetch =
  (
    dispatch: React.Dispatch<Action<keyof RepoDataState>>,
    controller: AbortController
  ) =>
  async <T, K extends keyof RepoDataState>(
    type: K,
    fetch: () => Promise<T>,
    normalize: (data: T) => RepoDataState[K]['data']
  ): Promise<void> => {
    if (controller.signal.aborted) {
      dispatch({ type, payload: false });
      return;
    }
    try {
      dispatch({ type, payload: true });
      const data = await fetch();
      dispatch({ type, payload: normalize(data) });
    } catch (error) {
      if (!controller.signal.aborted) {
        dispatch({ type, payload: toError(error) });
        controller.abort();
      }
    } finally {
      dispatch({ type, payload: false });
    }
  };

const DO_FETCH = false;

export const useRepoFetch = (
  orgName?: string,
  repoName?: string
): RepoDataState => {
  const [state, dispatch] = React.useReducer(reducer, initialRepoDataState);

  React.useEffect(() => {
    if (isNone(orgName) || isNone(repoName)) return;
    dispatch({ type: 'reset' });

    const controller = new AbortController();
    const handleFetch = handleDispatchFetch(dispatch, controller);

    const githubRepoApi = new GithubRepoAPI(
      orgName,
      repoName,
      controller.signal
    );

    (async () => {
      await handleFetch('info', () => githubRepoApi.getInfo(), normalizeRepo);
      DO_FETCH &&
        (await handleFetch(
          'branches',
          () => githubRepoApi.getBranches(),
          normalizeRepoBranchCollection
        ));
      await handleFetch(
        'langs',
        () => githubRepoApi.getLanguages(),
        normalizeRepoLangs
      );
      await handleFetch(
        'contributors',
        () => githubRepoApi.getContributors(),
        normalizeRepoContributorCollection
      );
      await handleFetch(
        'commit',
        () => githubRepoApi.getCommit(),
        normalizeCommit
      );
      DO_FETCH &&
        (await handleFetch(
          'readme',
          () => githubRepoApi.getReadme(),
          normalizeRepoReadme
        ));
    })();

    return () => {
      controller.abort();
    };
    // NOTE: Run effect once on component mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return state;
};
