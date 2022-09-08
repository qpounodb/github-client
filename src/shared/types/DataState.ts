import { Nullable } from './nullable';

export type DataState<T> = {
  data: Nullable<T>;
  error: Nullable<Error>;
  loading: boolean;
};
