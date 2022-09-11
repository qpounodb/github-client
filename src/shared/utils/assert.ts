import { fail } from './error';
import { isSomeString } from './is';

type AssertNotEmpty = (str: string) => asserts str;

export const assertNotEmpty: AssertNotEmpty = (str) =>
  !isSomeString(str) && fail('Empty string');
