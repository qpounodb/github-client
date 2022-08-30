import { Predicat } from '../types';

export const not =
  <P extends any[]>(func: Predicat<P>): Predicat<P> =>
  (...args: P) =>
    !func(...args);
