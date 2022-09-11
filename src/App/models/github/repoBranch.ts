import { CollectionModel, normalizeCollection } from '../shared';

export type RepoBranchApi = {
  name: string;
  commit: {
    sha: string;
    url: string;
  };
  protected: boolean;
};

export type RepoBranchModel = {
  name: string;
  commit: {
    sha: string;
    url: string;
  };
  protected: boolean;
};

export const getRepoBranchId = ({ name }: RepoBranchApi | RepoBranchModel) =>
  name;

export const normalizeRepoBranch = (from: RepoBranchApi): RepoBranchModel => ({
  name: from.name,
  commit: {
    sha: from.commit.sha,
    url: from.commit.url,
  },
  protected: from.protected,
});

export type RepoBranchModelCollection = CollectionModel<
  'name',
  RepoBranchModel
>;

export const normalizeRepoBranchCollection = normalizeCollection(
  'name',
  normalizeRepoBranch
);
