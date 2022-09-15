type ID = number | string;

export type Option<K extends ID = ID> = {
  key: K;
  value: string;
};
