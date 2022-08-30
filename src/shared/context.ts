import React from 'react';
import { useLocalStorage } from './hooks/useLocalStorage';

export type StateCtx<T> = {
  state: T;
  setState: React.Dispatch<React.SetStateAction<T>>;
};

/**
 * A helper to create a Context and Provider
 * @link https://react-typescript-cheatsheet.netlify.app/docs/basic/getting-started/context
 */
export const createCtx = <T>(defaultValue: T) => {
  const ctx = React.createContext<StateCtx<T>>({
    state: defaultValue,
    setState: () => defaultValue,
  });

  const useCtx = () => React.useContext(ctx);

  const Provider = (props: React.PropsWithChildren) => {
    const [state, setState] = React.useState(defaultValue);
    return React.createElement(ctx.Provider, {
      value: { state, setState },
      ...props,
    });
  };

  return { useCtx, Provider };
};

export const createLocalStorageCtx = <T>(key: string, defaultValue: T) => {
  const ctx = React.createContext<StateCtx<T>>({
    state: defaultValue,
    setState: () => defaultValue,
  });

  const useCtx = () => React.useContext(ctx);

  const Provider = (props: React.PropsWithChildren) => {
    const [state, setState] = useLocalStorage(key, defaultValue);
    return React.createElement(ctx.Provider, {
      value: { state, setState },
      ...props,
    });
  };

  return { useCtx, Provider };
};
