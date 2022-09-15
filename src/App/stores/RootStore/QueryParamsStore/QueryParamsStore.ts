import {
  action,
  computed,
  IReactionDisposer,
  makeObservable,
  observable,
  reaction,
} from 'mobx';
import { URLSearchParamsInit } from 'react-router-dom';

import {
  OrderDir,
  QueryParamsApp,
  SortKind,
  toOrderDir,
  toSortKind,
  toUrlSearchParams,
} from '~models/queryParams';
import { isSome, removeUndefined } from '~utils';

type SetURLSearchParams = (
  nextInit: URLSearchParamsInit,
  navigateOpts?: { replace?: boolean; state?: unknown }
) => void;

type Sort = keyof typeof SortKind;
type Order = keyof typeof OrderDir;

type PrivateFields = `_${keyof QueryParamsApp}`;

export class QueryParamsStore implements QueryParamsApp {
  private _setSearchParams: null | SetURLSearchParams = null;
  private _paramsReaction: IReactionDisposer;

  private _orgName?: string;
  private _page?: number;
  private _sort?: Sort;
  private _order?: Order;

  constructor() {
    makeObservable<QueryParamsStore, PrivateFields>(this, {
      _orgName: observable,
      _page: observable,
      _sort: observable,
      _order: observable,
      orgName: computed,
      page: computed,
      sort: computed,
      order: computed,
      params: computed,
      setParams: action.bound,
      setOrgName: action.bound,
      setPageNum: action.bound,
      setSort: action.bound,
      setOrder: action.bound,
    });

    this._paramsReaction = reaction(
      () => this.params,
      (params) => this._setSearchParams?.(toUrlSearchParams(params))
    );
  }

  get orgName(): string | undefined {
    return this._orgName;
  }

  get page(): number | undefined {
    return this._page;
  }

  get sort(): Sort | undefined {
    return this._sort;
  }

  get order(): Order | undefined {
    return this._order;
  }

  get params(): QueryParamsApp {
    return removeUndefined({
      orgName: this._orgName,
      page: this._page,
      sort: this._sort,
      order: this._order,
    });
  }

  setOrgName(name?: string): void {
    this._orgName = name || undefined;
    this._page = 1;
  }

  setPageNum(page?: number): void {
    this._page = page || undefined;
  }

  setSort(sort?: string): void {
    this._sort = toSortKind(sort);
    this._page = 1;
  }

  setOrder(order?: Order): void {
    this._order = order;
  }

  setParams(params: URLSearchParams): void {
    params.forEach((value, key) => {
      switch (key as keyof QueryParamsApp) {
        case 'orgName':
          this._orgName = value;
          break;
        case 'page':
          this._page = Number(value);
          break;
        case 'sort':
          this._sort = toSortKind(value);
          break;
        case 'order':
          this._order = toOrderDir(value);
          break;
      }
    });
    if (isSome(this._page) && (isNaN(this._page) || this._page < 1)) {
      this._page = 1;
      this.setPageNum(1);
    }
  }

  setSearchParamsSetter(setSearchParams: SetURLSearchParams) {
    this._setSearchParams = setSearchParams;
  }
}
