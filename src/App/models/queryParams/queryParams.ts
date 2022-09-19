import { URLSearchParamsInit } from 'react-router-dom';

import type { Nullable } from '~types';
import { isNumber, removeUndefined } from '~utils';

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
  page?: number;
};

export type QueryParamsApp = {
  orgName?: string;
  page?: number;
  sort?: Sort;
  order?: Order;
};

export const defaultQueryParamsAPI: QueryParamsAPI = {
  type: 'all',
  per_page: 5,
};

export const defaultQueryParamsApp: QueryParamsApp = {
  sort: 'updated',
  order: 'desc',
};

export const appParamsToApiParams = ({
  page,
  sort,
  order,
}: QueryParamsApp): QueryParamsAPI =>
  removeUndefined({
    ...defaultQueryParamsAPI,
    page,
    sort: toSortKind(sort || defaultQueryParamsApp.sort),
    direction: toOrderDir(order || defaultQueryParamsApp.order),
  });

export const toUrlSearchParams = ({
  page,
  orgName,
  order,
  sort,
}: QueryParamsApp): URLSearchParamsInit => {
  return removeUndefined({
    orgName,
    page: isNumber(page) && page > 1 ? String(page) : undefined,
    order: order !== defaultQueryParamsApp.order ? order : undefined,
    sort: sort !== defaultQueryParamsApp.sort ? sort : undefined,
  });
};
