import { Nullable } from './Nullable';

export type DataState<T extends object> = {
  data: Nullable<T>;
  error: Nullable<Error>;
  loading: boolean;
};
