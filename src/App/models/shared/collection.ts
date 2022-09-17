export type ID = string | number;

export type CollectionModel<K extends keyof T, T> = T[K] extends ID
  ? {
      order: Array<T[K]>;
      entities: Record<T[K], T>;
    }
  : never;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getInitialCollectionModel = (): CollectionModel<any, any> => ({
  order: [],
  entities: {},
});

type Normalize = <K extends keyof M, T, M>(
  keyId: K,
  normalize: (item: T) => M
) => ToCollection<K, T, M>;

export type ToCollection<K extends keyof M, T, M> = (
  list: T[]
) => CollectionModel<K, M>;

export const normalizeCollection: Normalize = (keyId, normalize) => (list) => {
  type K = typeof keyId;
  type M = ReturnType<typeof normalize>;

  const collection = getInitialCollectionModel() as CollectionModel<K, M>;

  list.forEach((item) => {
    try {
      const model = normalize(item);
      const id = model[keyId];
      collection.order.push(id);
      collection.entities[id] = model;
    } catch {
      // continue regardless of error
    }
  });

  return collection;
};

export const linerizeCollection = <T>({
  order,
  entities,
}: // eslint-disable-next-line @typescript-eslint/no-explicit-any
CollectionModel<any, T>): Array<T> => {
  return order.map((id) => entities[id]);
};
