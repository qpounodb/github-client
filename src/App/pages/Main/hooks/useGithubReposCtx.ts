import { createCtx } from '~/shared/context';
import { GithubAPI, Repository, RequestReposParams } from '~/shared/GithubAPI';
import { defaultRequestReposParams } from '~/shared/GithubAPI/GithubAPI';
import { Nullable } from '~/shared/utils';

type ReposState = RequestReposParams & {
  loading: boolean;
  error: Nullable<Error>;
  orgName: string;
  repos: Repository[];
  pages_count: number;
};

const initState: ReposState = {
  loading: false,
  error: null,
  orgName: '',
  repos: [],
  pages_count: 0,
  page: 1,
  per_page: 5,
};

const getRequestReposParams = (state: ReposState): RequestReposParams => ({
  type: state.type ?? defaultRequestReposParams.type,
  sort: state.sort ?? defaultRequestReposParams.sort,
  direction: state.direction ?? defaultRequestReposParams.direction,
  per_page: state.per_page ?? defaultRequestReposParams.per_page,
  page: state.page ?? defaultRequestReposParams.page,
});

const { useCtx, Provider } = createCtx<ReposState>(initState);

export const GithubReposProvider = Provider;

export const useGithubReposCtx = () => {
  const githubAPI = new GithubAPI();
  const { state, update } = useCtx();

  const fetch = async (orgName: string, page: number): Promise<void> => {
    const params = getRequestReposParams({ ...state, page });
    update((state) => ({ ...state, loading: true }));
    try {
      const count = await githubAPI.getReposCount(orgName);
      const pages_count = Math.ceil(count / state.per_page);
      const repos = await githubAPI.getRepos(orgName, params);
      update((state) => ({
        ...state,
        orgName,
        repos,
        page,
        pages_count,
        loading: false,
      }));
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Unknown error');
      update((state) => ({ ...state, error }));
    } finally {
      update((state) => ({ ...state, loading: false }));
    }
  };

  return {
    ...state,
    fetch,
  };
};
