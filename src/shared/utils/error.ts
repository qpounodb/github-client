import { AxiosError } from 'axios';

import { AppError } from '~errors';

export const fail = (reason?: string): never => {
  throw new Error(reason);
};

export const toError = (err: unknown): Error =>
  err instanceof Error ? err : new Error('Unknown error');

export const formatAxiosError = (error: AxiosError): string => {
  // console.warn(error.toJSON());
  const { response } = error;
  if (response) {
    return response.status >= 500 ? 'Server error' : 'Access error';
  }
  return 'Network error';
};

export const formatError = (err: unknown): string => {
  if (err instanceof AppError) {
    return err.message;
  }
  // console.error(err);
  return 'Internal error';
};
