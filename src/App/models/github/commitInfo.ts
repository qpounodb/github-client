import { Nullable } from '~/shared/types';

import { CommitterApi, CommitterModel, normalizeCommitter } from './committer';

export type CommitInfoApi = {
  message: string;
  author?: Nullable<CommitterApi>;
  committer?: Nullable<CommitterApi>;
};

export type CommitInfoModel = {
  message: string;
  author?: Nullable<CommitterModel>;
  committer?: Nullable<CommitterModel>;
};

export const normalizeCommitInfo = (from: CommitInfoApi): CommitInfoModel => ({
  message: from.message,
  author: from.author && normalizeCommitter(from.author),
  committer: from.committer && normalizeCommitter(from.committer),
});
