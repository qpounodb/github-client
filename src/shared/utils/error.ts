import axios, { AxiosError } from 'axios';

import { formatCode } from './format';

export const fail = (reason?: string): never => {
  throw new Error(reason);
};

export const toError = (err: unknown): Error =>
  err instanceof Error ? err : new Error('Unknown error');

export const formatAxiosError = ({
  message,
  status = '',
  code = '0',
  response,
}: AxiosError): string => {
  const title = `${status} [${code}]: ${message}`;

  if (!response) {
    return title;
  }

  const { data, headers } = response;

  return `${title}\n\n${formatCode(data)}\n\n${formatCode(headers)}`;
};

export const formatError = (err: unknown): string => {
  if (typeof err === 'string') return err;

  const error = toError(err);

  if (axios.isAxiosError(error)) {
    return formatAxiosError(error);
  }

  return error.message;
};
