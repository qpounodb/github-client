import { action, computed, makeObservable, observable, toJS } from 'mobx';
import {
  normalizeRepoCollection,
  RepoModelCollection,
} from '~/App/models/GitHub';
import { defaultRequestReposParams, GithubReposAPI } from '~/shared/GithubAPI';
import { ILocalStore } from '~/shared/hooks';
import { DataState, Nullable } from '~/shared/types';
import { toError } from '~/shared/utils';

type PrivateField =
  | '_loading'
  | '_error'
  | '_data'
  | '_orgName'
  | '_totalCount'
  | '_start'
  | '_reset'
  | '_end'
  | '_finally';

export class ReposStore implements ILocalStore {
  private _controller: Nullable<AbortController> = null;
  private readonly _api: GithubReposAPI = new GithubReposAPI();

  private _loading: boolean = false;
  private _data: Nullable<RepoModelCollection> = null;
  private _error: Nullable<Error> = null;

  private _orgName: string = '';
  private _totalCount: number = 0;

  constructor() {
    makeObservable<ReposStore, PrivateField>(this, {
      _loading: observable,
      _data: observable.ref,
      _error: observable.ref,
      _orgName: observable,
      _totalCount: observable,
      state: computed,
      loading: computed,
      orgName: computed,
      pagesCount: computed,
      _start: action.bound,
      _reset: action.bound,
      _end: action.bound,
      _finally: action.bound,
      fetch: action.bound,
      destroy: action.bound,
    });
  }

  get state(): DataState<RepoModelCollection> {
    return {
      loading: toJS(this._loading),
      error: toJS(this._error),
      data: toJS(this._data),
    };
  }

  get loading(): boolean {
    return this._loading;
  }

  get orgName(): string {
    return this._orgName;
  }

  get pagesCount(): number {
    return Math.ceil(this._totalCount / defaultRequestReposParams.per_page);
  }

  private _start(): AbortSignal {
    this._controller = new AbortController();
    this._loading = true;
    return this._controller.signal;
  }

  private _reset(): void {
    this._error = null;
    this._data = null;
  }

  stop(): void {
    this._controller?.abort();
  }

  private _end(
    orgName = this._orgName,
    totalCount = this._totalCount,
    result?: Nullable<Error | RepoModelCollection>
  ): void {
    this._controller = null;
    this._orgName = orgName;
    this._totalCount = totalCount;
    this._data = result instanceof Error ? null : result;
    this._error = result instanceof Error ? result : null;
  }

  private _finally(): void {
    this._loading = false;
  }

  async fetch(orgName: string, page = 1): Promise<void> {
    if (this.loading) {
      return;
    }

    const signal = this._start();

    try {
      if (page === 1) {
        const num = await this._api.checkOrg(orgName, signal);

        if (num === 0) {
          this._end(orgName, 0);
          return;
        }
      }

      const totalCount = await this._api.getReposCount(orgName, signal);

      const data = await this._api.getRepos(
        orgName,
        { ...defaultRequestReposParams, page },
        signal
      );

      this._end(orgName, totalCount, normalizeRepoCollection(data));
    } catch (error) {
      if (!signal.aborted) {
        this._end(orgName, this._totalCount, toError(error));
      }
    } finally {
      this._finally();
    }
  }

  destroy(): void {
    this.stop();
    this._end();
  }
}
