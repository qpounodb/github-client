import { Nullable } from './nullable';

export type DataState<T> = {
  data?: Nullable<T>;
  error?: boolean;
  loading?: boolean;
};
