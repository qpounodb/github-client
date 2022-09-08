export type RepoLangsApi = Record<string, number>;

export type RepoLangsModel = RepoLangsApi;

export const normalizeRepoLangs = (from: RepoLangsApi): RepoLangsModel => from;
