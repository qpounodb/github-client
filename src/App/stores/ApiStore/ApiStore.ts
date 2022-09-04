import { action, computed, makeObservable, observable, toJS } from 'mobx';
import { ILocalStore } from '~/shared/hooks';
import { DataState, Nullable } from '~/shared/types';
import { isNone, isSome, toError } from '~/shared/utils';

export type ApiStoreConfig<Params, Raw, Model> = {
  fetch: (params: Params, signal: AbortSignal) => Promise<Raw>;
  normalize: (data: Raw) => Model;
};

type PrivateField =
  | '_loading'
  | '_error'
  | '_data'
  | '_start'
  | '_end'
  | '_finally';

export class ApiStore<Params = any, Raw = any, Model = Raw>
  implements ILocalStore
{
  private _controller: Nullable<AbortController> = null;

  private _data: Nullable<Model> = null;
  private _error: Nullable<Error> = null;
  private _loading: boolean = false;

  private _fetch: (params: Params, signal: AbortSignal) => Promise<Raw>;
  private _normalize: (data: Raw) => Model;

  constructor({ fetch, normalize }: ApiStoreConfig<Params, Raw, Model>) {
    this._fetch = fetch;
    this._normalize = normalize;

    makeObservable<ApiStore<Params, Raw, Model>, PrivateField>(this, {
      _loading: observable,
      _error: observable.ref,
      _data: observable.ref,
      loading: computed,
      error: computed,
      data: computed,
      success: computed,
      state: computed,
      _start: action.bound,
      _end: action.bound,
      _finally: action.bound,
      fetch: action.bound,
      reset: action.bound,
      destroy: action.bound,
    });
  }

  get loading(): boolean {
    return this._loading;
  }

  get error(): Nullable<Error> {
    return this._error;
  }

  get data(): Nullable<Model> {
    return this._data;
  }

  get success(): boolean {
    return isNone(this._error) && isSome(this._data);
  }

  get state(): DataState<Model> {
    return {
      loading: toJS(this._loading),
      error: toJS(this._error),
      data: toJS(this._data),
    };
  }

  private _start(): AbortSignal {
    this._controller = new AbortController();
    this._loading = true;
    return this._controller.signal;
  }

  private _end(result?: Nullable<Error | Model>): void {
    this._controller = null;
    this._data = result instanceof Error ? null : result;
    this._error = result instanceof Error ? result : null;
  }

  private _finally(): void {
    this._loading = false;
  }

  async fetch(params: Params): Promise<void> {
    if (this.loading) {
      return;
    }

    const signal = this._start();

    try {
      const data = await this._fetch(params, signal);
      this._end(this._normalize(data));
    } catch (error) {
      if (!signal.aborted) {
        this._end(toError(error));
      }
    } finally {
      this._finally();
    }
  }

  reset(): void {
    this._data = null;
  }

  stop(): void {
    this._controller?.abort();
  }

  destroy(): void {
    this.stop();
    this.reset();
    this._end();
  }
}
