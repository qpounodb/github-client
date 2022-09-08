import { CollectionModel, normalizeCollection } from '../shared';
import { normalizeRepoOwner, RepoOwnerApi, RepoOwnerModel } from './repoOwner';

export type RepoContributorApi = RepoOwnerApi & {
  contributions: number;
};

export type RepoContributorModel = RepoOwnerModel & {
  commits: number;
};

export const normalizeRepoContributor = (
  from: RepoContributorApi
): RepoContributorModel => ({
  ...normalizeRepoOwner(from),
  commits: from.contributions,
});

export const getRepoContributorId = ({
  id,
}: RepoContributorApi | RepoContributorModel) => id;

export type RepoContributorModelCollection = CollectionModel<
  'id',
  RepoContributorModel
>;

export const normalizeRepoContributorCollection = normalizeCollection(
  'id',
  normalizeRepoContributor
);
