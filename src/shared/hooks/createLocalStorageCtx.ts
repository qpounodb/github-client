import React from 'react';

import { StateContext } from '../types';

import { useLocalStorage } from './useLocalStorage';

export const createLocalStorageCtx = <T>(key: string, defaultValue: T) => {
  const ctx = React.createContext<StateContext<T>>({
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
