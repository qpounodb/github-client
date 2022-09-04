import { Nullable } from './Nullable';

export type DataState<T> = {
  data: Nullable<T>;
  error: Nullable<Error>;
  loading: boolean;
};
