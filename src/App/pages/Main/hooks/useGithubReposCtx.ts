import { createCtx } from '~/shared/context';
import { DataState, getDataState, updateDataState } from '~/shared/data-state';
import {
  defaultRequestReposParams,
  GithubAPI,
  Repository,
  RequestReposParams,
} from '~/shared/GithubAPI';
import { Nullable, toError } from '~/shared/utils';

type ReposDataState = {
  orgName: string;
  pages_count: number;
  params: RequestReposParams;
  repos: DataState<Repository[]>;
};

const initReposDataState: ReposDataState = {
  orgName: '',
  pages_count: 0,
  params: {
    page: 1,
    per_page: 5,
  },
  repos: getDataState<Repository[]>(),
};

const updateRepos =
  (value: boolean | Error | Nullable<Repository[]>) =>
  (state: ReposDataState): ReposDataState => ({
    ...state,
    repos: updateDataState(value)(state.repos),
  });

const { useCtx, Provider } = createCtx<ReposDataState>(initReposDataState);

export const GithubReposProvider = Provider;

export const useGithubReposCtx = () => {
  const githubAPI = new GithubAPI();
  const { state, setState } = useCtx();

  const fetch = async (
    orgName: string,
    page: number,
    signal?: AbortSignal
  ): Promise<void> => {
    if (signal?.aborted) {
      setState(updateRepos(false));
      return;
    }
    const params = { ...defaultRequestReposParams, ...state.params, page };
    const per_page = params.per_page ?? defaultRequestReposParams.per_page;
    setState(updateRepos(true));

    try {
      const count = await githubAPI.getReposCount(orgName, signal);
      const pages_count = Math.ceil(count / per_page);

      const data = await githubAPI.getRepos(orgName, params, signal);
      setState((state) => ({
        ...state,
        orgName,
        pages_count,
        repos: { ...state.repos, data },
        params: { ...state.params, page },
      }));
    } catch (error) {
      if (!signal?.aborted) {
        setState(updateRepos(toError(error)));
      }
    } finally {
      setState(updateRepos(false));
    }
  };

  return { state, fetch };
};
