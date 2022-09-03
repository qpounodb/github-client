import React from 'react';
import { isNode } from './utils';

export const useHide = <T extends HTMLElement>(
  ref: React.MutableRefObject<T | null>,
  hide: () => void
) => {
  React.useEffect(() => {
    const escHandler = (e: KeyboardEvent) => e.key === 'Escape' && hide();

    const handleClickOutside = (e: Event) => {
      if (!isNode(e.target)) return;
      if (ref?.current?.contains(e.target)) return;
      hide();
    };

    document.addEventListener('keydown', escHandler);
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('keydown', escHandler);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref, hide]);
};

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
