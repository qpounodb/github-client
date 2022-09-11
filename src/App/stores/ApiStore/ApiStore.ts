import { CanceledError } from 'axios';
import { action, computed, makeObservable, observable } from 'mobx';
import { ILocalStore } from '~/shared/hooks';
import { DataState, Nullable } from '~/shared/types';
import { isSome } from '~/shared/utils';
import { rootStore } from '../RootStore';

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
  private _error: boolean = false;
  private _loading: boolean = false;

  private _fetch: (params: Params, signal: AbortSignal) => Promise<Raw>;
  private _normalize: (data: Raw) => Model;

  constructor({ fetch, normalize }: ApiStoreConfig<Params, Raw, Model>) {
    this._fetch = fetch;
    this._normalize = normalize;

    makeObservable<ApiStore<Params, Raw, Model>, PrivateField>(this, {
      _loading: observable,
      _error: observable,
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
    });
  }

  get loading(): boolean {
    return this._loading;
  }

  get error(): boolean {
    return this._error;
  }

  get data(): Nullable<Model> {
    return this._data;
  }

  get success(): boolean {
    return !this._error && isSome(this._data);
  }

  get state(): DataState<Model> {
    return {
      loading: this._loading,
      error: this._error,
      data: this._data,
    };
  }

  private _start(): AbortSignal {
    this._controller = new AbortController();
    this._loading = true;
    return this._controller.signal;
  }

  private _end(data: Nullable<Model> = null, error: boolean = false): void {
    this._controller = null;
    this._data = data;
    this._error = error;
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
      if (signal.aborted) {
        throw new CanceledError();
      }
      const data = await this._fetch(params, signal);
      this._end(this._normalize(data));
    } catch (err) {
      if (!signal.aborted) {
        this._end(null, true);
        rootStore.notifyStore.error(err);
      }
      throw err;
    } finally {
      this._finally();
    }
  }

  reset(): void {
    this._data = null;
    this._error = false;
    this._loading = false;
  }

  stop(): void {
    this._controller?.abort();
  }

  init(): void {}

  destroy(): void {
    this.stop();
    this.reset();
    this._controller = null;
  }
}
