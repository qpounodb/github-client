import React from 'react';

type UpdateState<T> = T | ((state: T) => T);
type UseState<T> = [T, (state: UpdateState<T>) => void];

/**
 * https://react-typescript-cheatsheet.netlify.app/docs/basic/useful-hooks#uselocalstorage
 */
export const useLocalStorage = <T>(
  key: string,
  initialState: T
): UseState<T> => {
  const [storedState, setStoredState] = React.useState<T>(() => {
    try {
      const state = window.localStorage.getItem(key);
      return state ? JSON.parse(state) : initialState;
    } catch (error) {
      console.log(error);
      return initialState;
    }
  });

  const setState = (updateState: UpdateState<T>) => {
    try {
      const state =
        updateState instanceof Function
          ? updateState(storedState)
          : updateState;
      setStoredState(state);
      window.localStorage.setItem(key, JSON.stringify(state));
    } catch (error) {
      console.log(error);
    }
  };

  return [storedState, setState];
};
