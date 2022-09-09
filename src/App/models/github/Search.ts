import { CollectionModel, ToCollection } from '../shared';

export type SearchApi<T> = {
  total_count: number;
  incomplete_results: boolean;
  items: T[];
};

export type SearchModel<KeyId extends keyof M, M> = {
  totalCount: number;
  incomplete: boolean;
  items: CollectionModel<KeyId, M>;
};

export const normalizeSearch = <KeyId extends keyof M, A, M>(
  from: SearchApi<A>,
  normalize: ToCollection<KeyId, A, M>
): SearchModel<KeyId, M> => ({
  totalCount: from.total_count,
  incomplete: from.incomplete_results,
  items: normalize(from.items),
});
