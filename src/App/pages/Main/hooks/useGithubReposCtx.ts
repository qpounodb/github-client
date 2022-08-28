import { createCtx } from '~/shared/context';
import { DataState, getDataState, updateDataState } from '~/shared/data-state';
import {
  defaultRequestReposParams,
  GithubAPI,
  Repository,
  RequestReposParams,
} from '~/shared/GithubAPI';
import { Nullable } from '~/shared/utils';

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

  const fetch = async (orgName: string, page: number): Promise<void> => {
    const params = { ...defaultRequestReposParams, ...state.params, page };
    const per_page = params.per_page ?? defaultRequestReposParams.per_page;
    setState(updateRepos(true));

    try {
      const count = await githubAPI.getReposCount(orgName);
      const pages_count = Math.ceil(count / per_page);

      const data = await githubAPI.getRepos(orgName, params);
      setState((state) => ({
        ...state,
        orgName,
        pages_count,
        repos: { ...state.repos, data },
        params: { ...state.params, page },
      }));
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Unknown error');
      setState(updateRepos(error));
    } finally {
      setState(updateRepos(false));
    }
  };

  return { state, fetch };
};
