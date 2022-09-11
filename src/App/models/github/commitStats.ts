export type CommitStatsApi = {
  additions: number;
  deletions: number;
  total: number;
};

export type CommitStatsModel = {
  additions: number;
  deletions: number;
  total: number;
};

export const normalizeCommitStats = (
  from: CommitStatsApi
): CommitStatsModel => ({
  additions: from.additions,
  deletions: from.deletions,
  total: from.total,
});
