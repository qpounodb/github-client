import { URLSearchParamsInit } from 'react-router-dom';
import { Nullable } from '~/shared/types';
import { isNone } from '~/shared/utils';

type ToType = <T extends Record<string, string>>(
  record: T,
  def: keyof T
) => (key: Nullable<string>) => keyof T;

const createNormalizerToType: ToType = (record, def) => (key) => {
  return (key && record[key]) ?? def;
};

export const REPOS_TYPES = {
  all: 'all',
  public: 'public',
  private: 'private',
  forks: 'forks',
  sources: 'sources',
  member: 'member',
};
export type ReposTypes = keyof typeof REPOS_TYPES;
export const toRepoType = createNormalizerToType(REPOS_TYPES, 'all');

export const SORT_TYPES = {
  created: 'created',
  updated: 'updated',
  pushed: 'pushed',
  full_name: 'full_name',
};
export type SortTypes = keyof typeof SORT_TYPES;
export const toSortType = createNormalizerToType(SORT_TYPES, 'updated');

export const ORDER_TYPES = {
  asc: 'asc',
  desc: 'desc',
};
export type OrderTypes = keyof typeof ORDER_TYPES;
export const toOrderType = createNormalizerToType(ORDER_TYPES, 'asc');

export type QueryParamsAPI = {
  type?: ReposTypes;
  sort?: SortTypes;
  direction?: OrderTypes;
  per_page: number;
  page: number;
};

export type QueryParamsApp = {
  orgName?: string;
  page?: number;
  sort?: SortTypes;
  order?: OrderTypes;
};

export const defaultQueryParamsAPI: Required<QueryParamsAPI> = {
  type: 'all',
  sort: 'updated',
  direction: 'desc',
  per_page: 5,
  page: 1,
};

export const appParamsToApiParams = ({
  page,
  sort,
  order,
}: QueryParamsApp): QueryParamsAPI => ({
  ...defaultQueryParamsAPI,
  page: page ?? 1,
  sort: toSortType(sort),
  direction: toOrderType(order),
});

export const toUrlSearchParams = ({
  page,
  ...params
}: QueryParamsApp): URLSearchParamsInit => {
  return isNone(page) ? { ...params } : { ...params, page: String(page) };
};
