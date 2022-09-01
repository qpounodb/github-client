import { CollectionModel, normalizeCollection } from '../shared';

export type CommitFileApi = {
  sha: string;
  filename: string;
  status: string;
  additions: number;
  deletions: number;
  changes: number;
};

export type CommitFileModel = {
  sha: string;
  filename: string;
  status: string;
  additions: number;
  deletions: number;
  changes: number;
};

export const getCommitFileId = ({ sha }: CommitFileApi | CommitFileModel) =>
  sha;

export const normalizeCommitFile = (from: CommitFileApi): CommitFileModel => ({
  sha: from.sha,
  filename: from.filename,
  status: from.status,
  additions: from.additions,
  deletions: from.deletions,
  changes: from.changes,
});

export type CommitFileCollection = CollectionModel<'sha', CommitFileModel>;

export const normalizeCommitFileCollection = normalizeCollection(
  'sha',
  normalizeCommitFile
);
