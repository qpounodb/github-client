import { Nullable } from '~/shared/types';

import { CollectionModel, normalizeCollection } from '../shared';

import {
  CommitFileApi,
  CommitFileCollection,
  normalizeCommitFileCollection,
} from './commitFile';
import {
  CommitInfoApi,
  CommitInfoModel,
  normalizeCommitInfo,
} from './commitInfo';
import {
  CommitStatsApi,
  CommitStatsModel,
  normalizeCommitStats,
} from './commitStats';
import { normalizeRepoOwner, RepoOwnerApi, RepoOwnerModel } from './repoOwner';

export type CommitApi = {
  sha: string;
  commit: CommitInfoApi;
  author?: Nullable<RepoOwnerApi>;
  committer?: Nullable<RepoOwnerApi>;
  stats: CommitStatsApi;
  files: CommitFileApi[];
};

export type CommitModel = {
  sha: string;
  commit: CommitInfoModel;
  author?: Nullable<RepoOwnerModel>;
  committer?: Nullable<RepoOwnerModel>;
  stats: CommitStatsModel;
  files: CommitFileCollection;
};

export const getCommitId = ({ sha }: CommitApi | CommitModel) => sha;

export const normalizeCommit = (from: CommitApi): CommitModel => ({
  sha: from.sha,
  commit: normalizeCommitInfo(from.commit),
  author: from.author && normalizeRepoOwner(from.author),
  committer: from.committer && normalizeRepoOwner(from.committer),
  stats: normalizeCommitStats(from.stats),
  files: normalizeCommitFileCollection(from.files),
});

export type CommitModelCollection = CollectionModel<'sha', CommitModel>;

export const normalizeCommitCollection = normalizeCollection(
  'sha',
  normalizeCommit
);
