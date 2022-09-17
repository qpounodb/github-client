import { URLSearchParamsInit } from 'react-router-dom';

import type { Nullable } from '~types';
import { isNone } from '~utils';

export enum RepoType {
  all = 'all',
  public = 'public',
  private = 'private',
  forks = 'forks',
  sources = 'sources',
  member = 'member',
}

export enum SortKind {
  created = 'created',
  updated = 'updated',
  pushed = 'pushed',
  full_name = 'full_name',
}

export enum OrderDir {
  asc = 'asc',
  desc = 'desc',
}

type ToType = <Enum extends Record<string, unknown>>(
  someEnum: Enum,
  def: keyof Enum
) => (key: Nullable<string>) => keyof Enum;

const createNormalizer: ToType = (someEnum, def) => (key) => {
  return key && Object.hasOwn(someEnum, key) ? key : def;
};

export const toRepoType = createNormalizer(RepoType, RepoType.all);
export const toSortKind = createNormalizer(SortKind, SortKind.updated);
export const toOrderDir = createNormalizer(OrderDir, OrderDir.asc);

type Repos = keyof typeof RepoType;
type Sort = keyof typeof SortKind;
type Order = keyof typeof OrderDir;

export type QueryParamsAPI = {
  type?: Repos;
  sort?: Sort;
  direction?: Order;
  per_page: number;
  page: number;
};

export type QueryParamsApp = {
  orgName?: string;
  page?: number;
  sort?: Sort;
  order?: Order;
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
  sort: toSortKind(sort),
  direction: toOrderDir(order),
});

export const toUrlSearchParams = ({
  page,
  ...params
}: QueryParamsApp): URLSearchParamsInit => {
  return isNone(page) ? { ...params } : { ...params, page: String(page) };
};
