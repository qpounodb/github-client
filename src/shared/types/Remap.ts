export type Remap<T, V> = { [P in keyof T]: V };

export type RemapProp<T, K extends keyof T, V> = {
  [P in keyof T]: P extends K ? V : T[P];
};
