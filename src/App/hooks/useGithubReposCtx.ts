import { createCtx } from '~/shared/context';
import { githubAPI, Repository, RequestReposParams } from '~/shared/GithubAPI';

type ReposState = RequestReposParams & {
  loading: boolean;
  orgName: string;
  repos: Repository[];
  pages_count: number;
};

const initState: ReposState = {
  loading: false,
  orgName: '',
  repos: [],
  pages_count: 0,
  page: 1,
  per_page: 5,
};

const getRequestReposParams = (state: ReposState): RequestReposParams => ({
  type: state.type,
  sort: state.sort,
  direction: state.direction,
  per_page: state.per_page,
  page: state.page,
});

const { useCtx, Provider } = createCtx<ReposState>(initState);

export const GithubReposProvider = Provider;

export const useGithubReposCtx = () => {
  const { state, update } = useCtx();

  const setOrgName = (orgName: string) => {
    update((state) => (orgName.length > 0 ? { ...state, orgName } : initState));
  };

  const setPage = (page: number) => {
    update((state) => ({ ...state, page }));
  };

  const fetch = async (page: number): Promise<void> => {
    const { orgName } = state;
    const params = getRequestReposParams({ ...state, page });
    update((state) => ({ ...state, loading: true }));
    try {
      const count = await githubAPI.getReposCount(orgName);
      const pages_count = Math.ceil(count / state.per_page);
      const repos = await githubAPI.getRepos(orgName, params);
      update((state) => ({
        ...state,
        repos,
        page,
        pages_count,
        loading: false,
      }));
    } catch (error) {
      update(() => initState);
      throw error;
    }
  };

  return {
    ...state,
    fetch,
    setOrgName,
    setPage,
  };
};
