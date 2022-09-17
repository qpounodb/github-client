import { action, computed, makeObservable, observable } from 'mobx';

import type { ILocalStore, Nullable } from '~types';
import { isCanceledError } from '~utils';

import { rootStore } from '../RootStore';

enum ApiStoreState {
  IDLE,
  LOADING,
  ERROR,
  SUCCESS,
}

type PrivateField = '_state' | '_start' | '_end';

export class ApiStore implements ILocalStore {
  private _controller: Nullable<AbortController> = null;

  private _state = ApiStoreState.IDLE;

  constructor() {
    makeObservable<ApiStore, PrivateField>(this, {
      _state: observable,
      isIdle: computed,
      isLoading: computed,
      isError: computed,
      isSuccess: computed,
      _start: action.bound,
      _end: action.bound,
      reset: action.bound,
      run: action.bound,
    });
  }

  get isIdle(): boolean {
    return this._state === ApiStoreState.IDLE;
  }

  get isLoading(): boolean {
    return this._state === ApiStoreState.LOADING;
  }

  get isError(): boolean {
    return this._state === ApiStoreState.ERROR;
  }

  get isSuccess(): boolean {
    return this._state === ApiStoreState.SUCCESS;
  }

  init(): void {
    this.reset();
  }

  destroy(): void {
    this.stop();
    this.reset();
    this._controller = null;
  }

  reset(): void {
    this._state = ApiStoreState.IDLE;
  }

  stop(): void {
    this._controller?.abort();
  }

  private _start(): void {
    this._state = ApiStoreState.LOADING;
  }

  private _end(err?: unknown): void {
    if (this.isIdle) return;
    if (!err) {
      this._state = ApiStoreState.SUCCESS;
      return;
    }
    this._state = ApiStoreState.ERROR;
    if (isCanceledError(err)) return;
    rootStore.notifyStore.error(err);
  }

  async run<T>(
    fetch: (signal: AbortSignal) => Promise<T | null>
  ): Promise<T | null> {
    if (this.isLoading) {
      return null;
    }

    this._start();
    this._controller = new AbortController();
    let data: T | null = null;

    try {
      data = await fetch(this._controller.signal);
      this._end();
    } catch (err) {
      this._end(err);
    } finally {
      this._controller = null;
    }

    return data;
  }
}
