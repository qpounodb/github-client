import { CanceledError } from 'axios';

import { None, Nullable } from '../types';

export const isNone = <T>(x: Nullable<T>): x is None => {
  return x === null || x === undefined;
};

export const isSome = <T>(x: Nullable<T>): x is T => {
  return !isNone(x);
};

export const isNumber = (x: unknown): x is number => {
  return typeof x === 'number' && !isNaN(x);
};

export const isAnyString = (x: unknown): x is string => {
  return typeof x === 'string';
};

export const isSomeString = (x: unknown): x is string => {
  return typeof x === 'string' && Boolean(x);
};

export const isArray = (x: unknown): x is Array<unknown> => {
  return Array.isArray(x);
};

export const isRecord = (x: unknown): x is Record<string, unknown> => {
  return isSome(x) && !isArray(x) && typeof x === 'object';
};

export const isNode = (e: Event['target']): e is Node => {
  return e !== null && 'nodeType' in e;
};

export const isCanceledError = (
  err: unknown
): err is CanceledError<unknown> => {
  return err instanceof CanceledError;
};
