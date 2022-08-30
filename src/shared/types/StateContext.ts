export type StateContext<T> = {
  state: T;
  setState: React.Dispatch<React.SetStateAction<T>>;
};
