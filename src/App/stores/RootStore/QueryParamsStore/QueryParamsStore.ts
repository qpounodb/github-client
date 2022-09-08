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
  OrderTypes,
  QueryParamsApp,
  SortTypes,
  toOrderType,
  toSortType,
  toUrlSearchParams,
} from '~/App/models/queryParams';
import { isSome } from '~/shared/utils';

type SetURLSearchParams = (
  nextInit: URLSearchParamsInit,
  navigateOpts?: { replace?: boolean; state?: any }
) => void;

type PrivateFields = `_${keyof QueryParamsApp}`;

export class QueryParamsStore implements QueryParamsApp {
  private _setSearchParams: null | SetURLSearchParams = null;
  private _paramsReaction: IReactionDisposer;

  private _orgName?: string;
  private _page?: number;
  private _sort?: SortTypes;
  private _order?: OrderTypes;

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

  get sort(): SortTypes | undefined {
    return this._sort;
  }

  get order(): OrderTypes | undefined {
    return this._order;
  }

  get params(): QueryParamsApp {
    const params: QueryParamsApp = {};
    isSome(this._orgName) && (params.orgName = this._orgName);
    isSome(this._page) && (params.page = this._page);
    isSome(this._sort) && (params.sort = this._sort);
    isSome(this._order) && (params.order = this._order);
    return params;
  }

  setOrgName(name?: string): void {
    this._orgName = name;
    this._page = 1;
  }

  setPageNum(page?: number): void {
    this._page = page;
  }

  setSort(sort?: string): void {
    if (isSome(sort)) {
      this._sort = toSortType(sort);
      this._order = sort === 'full_name' ? 'asc' : 'desc';
    } else {
      this._sort = sort;
    }
  }

  setOrder(order?: string): void {
    this._order = isSome(order) ? toOrderType(order) : order;
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
          this._sort = toSortType(value);
          break;
        case 'order':
          this._order = toOrderType(value);
          break;
      }
    });
  }

  setSearchParamsSetter(setSearchParams: SetURLSearchParams) {
    this._setSearchParams = setSearchParams;
  }
}
