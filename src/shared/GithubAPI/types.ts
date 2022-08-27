// GitHub REST API: https://docs.github.com/en/rest

export interface Owner {
  /** 'User' | 'Organization' */
  type: string;
  id: number;
  login: string;
  name?: string | null;
  avatar_url: string;
  html_url: string;
  url: string;
  repos_url: string;
}

export interface Contributor extends Owner {
  contributions: number;
}

export interface User extends Omit<Owner, 'type'> {
  type: 'User';
  name?: string | null;
  bio?: string | null;
  blog?: string | null;
  email?: string | null;
  location?: string | null;
}

export interface Organization extends Omit<Owner, 'type'> {
  type: 'Organization';
  name: string;
  description?: string | null;
  blog: string;
  email: string;
  location: string;
  is_verified: boolean;
  members_url: string;
}

export interface Repository {
  id: number;
  name: string;
  html_url: string;
  url: string;
  description?: string | null;
  topics: string[];
  created_at: string;
  updated_at: string;
  private: boolean;
  fork: boolean;
  archived: boolean;
  disabled: boolean;
  owner: Owner;
  forks_count: number;
  stargazers_count: number;
  subscribers_count: number;
  open_issues_count: number;
  size: number;
  language?: string | null;
}

export interface SearchReposResult {
  total_count: number;
  incomplete_results: boolean;
  items: Repository[];
}

export type Languages = Record<string, number>;

export interface Branch {
  name: string;
  commit: {
    sha: string;
    url: string;
  };
  protected: boolean;
}

export interface Commit {
  sha: string;
  commit: {
    author: Committer;
    committer: Committer;
    message: string;
    tree: {
      sha: string;
      url: string;
    };
    url: string;
  };
  author: Owner;
  committer: Owner;
  stats: CommitStats;
  files: CommitFile[];
}

export interface Committer {
  name: string;
  email: string;
  date: string;
}

export interface CommitStats {
  additions: number;
  deletions: number;
  total: number;
}

export interface CommitFile {
  sha: string;
  filename: string;
  status: string;
  additions: number;
  deletions: number;
  changes: number;
}

export interface Readme {
  type: 'file';
  name: string;
  path: string;
  encoding: string;
  content: string;
  html_url: string;
  download_url: string;
}
