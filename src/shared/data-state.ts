import { Nullable } from './utils';

export type DataState<T extends object> = {
  data: Nullable<T>;
  error: Nullable<Error>;
  loading: boolean;
};

export const getDataState = <T extends object>(
  value?: boolean | Error | Nullable<T>
): DataState<T> => {
  if (typeof value === 'boolean') {
    return { data: null, error: null, loading: value };
  }
  if (value instanceof Error) {
    return { data: null, error: value, loading: false };
  }
  return { data: value, error: null, loading: false };
};

export const updateDataState =
  <T extends object>(value: boolean | Error | Nullable<T>) =>
  (state: DataState<T>): DataState<T> => {
    if (typeof value === 'boolean') {
      return value ? getDataState<T>(true) : { ...state, loading: false };
    }
    if (value instanceof Error) {
      return { ...state, error: value };
    }
    return { ...state, data: value };
  };
