export const fail = (reason?: string): never => {
  throw new Error(reason);
};

export const toError = (err: unknown): Error =>
  err instanceof Error ? err : new Error('Unknown error');
