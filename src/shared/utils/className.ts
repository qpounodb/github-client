import { isSomeString } from './is';

export const joinClassName = (...args: unknown[]): string => {
  return args.filter(isSomeString).join(' ');
};
