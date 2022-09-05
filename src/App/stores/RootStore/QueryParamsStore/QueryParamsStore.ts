import { action, computed, makeObservable, observable } from 'mobx';
import { createSearchParams, URLSearchParamsInit } from 'react-router-dom';

type SetURLSearchParams = (
  nextInit: URLSearchParamsInit,
  navigateOpts?: { replace?: boolean; state?: any }
) => void;

export type ReposQueryParams = {
  orgName: string;
  pageNum: number;
};

type PrivateFields = '_params';

export class QueryParamsStore {
  private _params: URLSearchParams = createSearchParams('');
  private _setSearchParams: null | SetURLSearchParams = null;

  constructor() {
    makeObservable<QueryParamsStore, PrivateFields>(this, {
      _params: observable,
      orgName: computed,
      pageNum: computed,
      reposParams: computed,
      setParams: action.bound,
      setOrgName: action.bound,
      setPageNum: action.bound,
    });
  }

  get orgName(): string {
    return this._params.get('org') ?? '';
  }

  get pageNum(): number {
    return Number(this._params.get('page') ?? 1);
  }

  get reposParams(): ReposQueryParams {
    return {
      orgName: this.orgName,
      pageNum: this.pageNum,
    };
  }

  setOrgName(name: string): void {
    if (!name) {
      this._setSearchParams?.('');
      return;
    }
    this._params.set('org', name);
    this._params.set('page', '1');
    this._setSearchParams?.(this._params);
  }

  setPageNum(page: number): void {
    this._params.set('page', String(page));
    this._setSearchParams?.(this._params);
  }

  setParams(params: URLSearchParams): void {
    this._params = params;
  }

  setSearchParamsSetter(setSearchParams: SetURLSearchParams) {
    this._setSearchParams = setSearchParams;
  }
}
