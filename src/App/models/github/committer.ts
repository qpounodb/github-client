export type CommitterApi = {
  name: string;
  email: string;
  date: string;
};

export type CommitterModel = {
  name: string;
  email: string;
  date: Date;
};

export const normalizeCommitter = (from: CommitterApi): CommitterModel => ({
  name: from.name,
  email: from.email,
  date: new Date(from.date),
});
