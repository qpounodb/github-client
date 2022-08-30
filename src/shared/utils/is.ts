import { None, Nullable } from '../types/Nullable';

export const isNone = <T>(x: Nullable<T>): x is None =>
  x === null || x === undefined;

export const isSome = <T>(x: Nullable<T>): x is T => !isNone(x);

export const isNumber = (x: unknown): x is number => {
  return typeof x === 'number';
};

export const isAnyString = (x: unknown): x is string => {
  return typeof x === 'string';
};

export const isSomeString = (x: unknown): x is string => {
  return typeof x === 'string' && Boolean(x);
};

export const isNode = (e: Event['target']): e is Node =>
  e !== null && 'nodeType' in e;
