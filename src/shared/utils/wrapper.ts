import { Predicat } from '../types';

export const not =
  <P extends any[]>(func: Predicat<P>): Predicat<P> =>
  (...args: P) =>
    !func(...args);

export function getDisplayName<T>(
  wrapperName: string,
  WrappedComponent: React.FC<T>
) {
  const name =
    WrappedComponent.displayName || WrappedComponent.name || 'Component';
  return `${wrapperName}(${name})`;
}
