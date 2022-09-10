import { NotifyStore } from './NotifyStore';
import { QueryParamsStore } from './QueryParamsStore';

export class RootStore {
  readonly queryParamsStore = new QueryParamsStore();
  readonly notifyStore = new NotifyStore();
}
