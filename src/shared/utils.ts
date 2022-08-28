import builder from 'classnames';

export type PropsWithClassName<P = unknown> = { className?: string } & P;

export type PropsWithChildrenAndClassname<P = unknown> =
  React.PropsWithChildren<PropsWithClassName<P>>;

export const classname = builder;

export type Predicat<P extends any[]> = (...args: P) => boolean;

export const not =
  <P extends any[]>(func: Predicat<P>): Predicat<P> =>
  (...args: P) =>
    !func(...args);

export const isNode = (e: Event['target']): e is Node =>
  e !== null && 'nodeType' in e;

export type None = null | undefined;

export type Nullable<T> = T | None;

export const isNone = <T>(x: Nullable<T>): x is None =>
  x === null || x === undefined;

export const isSome = <T>(x: Nullable<T>): x is T => !isNone(x);

export type Remap<T, V> = { [P in keyof T]: V };

export type RemapProp<T, K extends keyof T, V> = {
  [P in keyof T]: P extends K ? V : T[P];
};

// Workaround typing: https://github.com/microsoft/TypeScript/pull/33622#issuecomment-575301357
export const assertNotEmpty: (str: string) => asserts str = (str) => {
  if (!str) {
    throw new Error('Empty string');
  }
};

/**
 * @param name https://devicon.dev/
 * @returns
 */
export const getLangLogo = (name: string) => {
  const lang = name
    .toLocaleLowerCase()
    .replaceAll('+', 'plus')
    .replaceAll('#', 'sharp');
  return `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${lang}/${lang}-original.svg`;
};

export const formatCount = (count: number): string => {
  return count < 1000 ? String(count) : `${Math.round(count / 100) / 10}k`;
};

export const sleep = (timeout: number = 1000): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, timeout));
