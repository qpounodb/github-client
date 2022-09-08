import { Nullable } from '~/shared/types';
import { CollectionModel, normalizeCollection } from '../shared';

export type RepoOwnerApi = {
  /** 'User' | 'Organization' */
  type: string;
  id: number;
  login: string;
  avatar_url: string;
  html_url: string;
  name?: Nullable<string>;
};

export type RepoOwnerModel = {
  /** 'User' | 'Organization' */
  type: string;
  id: number;
  login: string;
  avatarUrl: string;
  htmlUrl: string;
  name?: Nullable<string>;
};

export const getRepoOwnerId = ({ id }: RepoOwnerApi | RepoOwnerModel) => id;

export const normalizeRepoOwner = (from: RepoOwnerApi): RepoOwnerModel => ({
  type: from.type,
  id: from.id,
  login: from.login,
  avatarUrl: from.avatar_url,
  htmlUrl: from.html_url,
  name: from.name,
});

export type RepoOwnerCollection = CollectionModel<'id', RepoOwnerModel>;

export const normalizeRepoOwnerCollection = normalizeCollection(
  'id',
  normalizeRepoOwner
);
