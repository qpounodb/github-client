// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Predicat<T extends any[]> = (...args: T) => boolean;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type PredicatWrapper = <T extends any[]>(predicat: Predicat<T>) => Predicat<T>;

export const not: PredicatWrapper =
  (predicat) =>
  (...args) =>
    !predicat(...args);

export function getDisplayName<T>(
  wrapperName: string,
  WrappedComponent: React.FC<T>
) {
  const name =
    WrappedComponent.displayName || WrappedComponent.name || 'Component';
  return `${wrapperName}(${name})`;
}
