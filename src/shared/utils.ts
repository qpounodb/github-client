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

export const formatCode = (x: unknown) => JSON.stringify(x, null, 4);

export const toError = (err: unknown): Error =>
  err instanceof Error ? err : new Error('Unknown error');
