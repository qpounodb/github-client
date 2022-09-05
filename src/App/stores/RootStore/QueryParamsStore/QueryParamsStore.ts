import { action, computed, makeObservable, observable } from 'mobx';
import { createSearchParams, URLSearchParamsInit } from 'react-router-dom';
import {
  OrderTypes,
  SortTypes,
  toOrderType,
  toSortType,
} from '~/shared/GithubAPI';
import { Nullable } from '~/shared/types';
import { ReposQueryParams } from '../../ApiStore';

type SetURLSearchParams = (
  nextInit: URLSearchParamsInit,
  navigateOpts?: { replace?: boolean; state?: any }
) => void;

type PrivateFields = '_params';

export class QueryParamsStore {
  private _params: URLSearchParams = createSearchParams('');
  private _setSearchParams: null | SetURLSearchParams = null;

  constructor() {
    makeObservable<QueryParamsStore, PrivateFields>(this, {
      _params: observable,
      orgName: computed,
      pageNum: computed,
      sortType: computed,
      orderType: computed,
      reposParams: computed,
      setParams: action.bound,
      setOrgName: action.bound,
      setPageNum: action.bound,
      setSort: action.bound,
      setOrder: action.bound,
    });
  }

  get orgName(): string {
    return this._params.get('org') ?? '';
  }

  get pageNum(): number {
    return Number(this._params.get('page') ?? 1);
  }

  get sortType(): SortTypes {
    return toSortType(this._params.get('sort'));
  }

  get orderType(): OrderTypes {
    return toOrderType(this._params.get('order'));
  }

  get reposParams(): ReposQueryParams {
    return {
      orgName: this.orgName,
      pageNum: this.pageNum,
      sortType: this.sortType,
      orderType: this.orderType,
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

  setSort(sort?: Nullable<string>): void {
    this._params.set('sort', sort ?? '');
    this._params.set('order', sort === 'full_name' ? 'asc' : 'desc');
    this._setSearchParams?.(this._params);
  }

  setOrder(order?: Nullable<string>): void {
    this._params.set('order', order ?? '');
    this._setSearchParams?.(this._params);
  }

  setParams(params: URLSearchParams): void {
    this._params = params;
  }

  setSearchParamsSetter(setSearchParams: SetURLSearchParams) {
    this._setSearchParams = setSearchParams;
  }
}
