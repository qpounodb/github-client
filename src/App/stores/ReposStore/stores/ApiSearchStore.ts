import { computed, makeObservable, override } from 'mobx';

import { ApiStore } from '~stores';
import { isSome } from '~utils';

export class ApiSearchStore extends ApiStore<string, number> {
  constructor(
    fetch: (orgName: string, signal: AbortSignal) => Promise<number>
  ) {
    super({
      fetch,
      normalize: (x) => x,
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
