export type RepoReadmeApi = {
  /** 'file' */
  type: string;
  name: string;
  path: string;
  encoding: string;
  content: string;
};

export type RepoReadmeModel = {
  /** 'file' */
  type: string;
  name: string;
  path: string;
  encoding: string;
  content: string;
};

export const normalizeRepoReadme = (from: RepoReadmeApi): RepoReadmeModel => ({
  type: from.type,
  name: from.name,
  path: from.path,
  encoding: from.encoding,
  content: from.content,
});
