import { QueryParamsStore } from './QueryParamsStore';

export class RootStore {
  readonly queryParamsStore = new QueryParamsStore();
}
