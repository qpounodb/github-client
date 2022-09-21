import React from 'react';

/**
 * https://react-typescript-cheatsheet.netlify.app/docs/basic/useful-hooks#uselocalstorage
 */
export const useLocalStorage = <T>(
  key: string,
  initialState: T
): [T, (state: T | ((state: T) => T)) => void] => {
  const [storedState, setStoredState] = React.useState<T>(() => {
    try {
      const state = window.localStorage.getItem(key);
      return state ? (JSON.parse(state) as T) : initialState;
    } catch {
      return initialState;
    }
  });

  const setState = React.useCallback(
    (update: T | ((state: T) => T)) => {
      try {
        const state = update instanceof Function ? update(storedState) : update;
        setStoredState(state);
        window.localStorage.setItem(key, JSON.stringify(state));
      } catch (error) {
        // console.log(error);
      }
    },
    [key, storedState]
  );

  return [storedState, setState];
};
