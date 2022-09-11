import { Nullable } from '~/shared/types';
import { CollectionModel, normalizeCollection } from '../shared';
import { normalizeRepoOwner, RepoOwnerApi, RepoOwnerModel } from './repoOwner';

export type RepoApi = {
  owner: RepoOwnerApi;
  created_at: string;
  updated_at: string;
  id: number;
  name: string;
  html_url: string;
  private: boolean;
  fork: boolean;
  archived: boolean;
  disabled: boolean;
  forks_count: number;
  stargazers_count: number;
  subscribers_count: number;
  open_issues_count: number;
  size: number;
  topics: string[];
  description?: Nullable<string>;
  language?: Nullable<string>;
};

export type RepoModel = {
  owner: RepoOwnerModel;
  createdAt: Date;
  updatedAt: Date;
  id: number;
  name: string;
  htmlUrl: string;
  private: boolean;
  fork: boolean;
  archived: boolean;
  disabled: boolean;
  forksCount: number;
  stargazersCount: number;
  subscribersCount: number;
  openIssuesCount: number;
  size: number;
  topics: string[];
  description?: Nullable<string>;
  language?: Nullable<string>;
};

export const getRepoId = ({ id }: RepoApi | RepoModel) => id;

export const normalizeRepo = (from: RepoApi): RepoModel => ({
  owner: normalizeRepoOwner(from.owner),
  createdAt: new Date(from.created_at),
  updatedAt: new Date(from.updated_at),
  id: from.id,
  name: from.name,
  htmlUrl: from.html_url,
  private: from.private,
  fork: from.fork,
  archived: from.archived,
  disabled: from.disabled,
  forksCount: from.forks_count,
  stargazersCount: from.stargazers_count,
  subscribersCount: from.subscribers_count,
  openIssuesCount: from.open_issues_count,
  size: from.size,
  topics: from.topics,
  description: from.description,
  language: from.language,
});

export type RepoModelCollection = CollectionModel<'id', RepoModel>;

export const normalizeRepoCollection = normalizeCollection('id', normalizeRepo);
