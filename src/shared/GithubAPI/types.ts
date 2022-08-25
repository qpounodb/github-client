// GitHub REST API: https://docs.github.com/en/rest

export interface Owner {
  type: 'User' | 'Organization';
  id: number;
  login: string;
  name: string | null;
  avatar_url: string;
  html_url: string;
  url: string;
  repos_url: string;
}

export interface User extends Omit<Owner, 'type'> {
  type: 'User';
  name: string | null;
  bio: string | null;
  blog: string | null;
  email: string | null;
  location: string | null;
}

export interface Organization extends Omit<Owner, 'type'> {
  type: 'Organization';
  name: string;
  description: string | null;
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
  description: string | null;
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
  watchers_count: number;
  size: number;
  language: string | null;
}

export interface SearchReposResult {
  total_count: number;
  incomplete_results: boolean;
  items: Repository[];
}
