import { computed, makeObservable, override } from 'mobx';
import { SearchApi } from '~/App/models/github/search';
import { isSome } from '~/shared/utils';
import { ApiStore } from './ApiStore';

type FetchParams = { orgName: string };

export class ApiSearchStore<T extends any = any> extends ApiStore<
  FetchParams,
  SearchApi<T>,
  number
> {
  constructor(
    fetch: (params: FetchParams, signal: AbortSignal) => Promise<SearchApi<T>>
  ) {
    super({
      fetch,
      normalize: ({ total_count }) => total_count,
    });

    makeObservable(this, {
      success: override,
      fail: computed,
    });
  }

  get success(): boolean {
    return !this.error && isSome(this.data) && this.data > 0;
  }

  get fail(): boolean {
    return !this.success;
  }
}
