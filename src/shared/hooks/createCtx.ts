import React from 'react';
import { StateContext } from '../types';

/**
 * A helper to create a Context and Provider
 * @link https://react-typescript-cheatsheet.netlify.app/docs/basic/getting-started/context
 */
export const createCtx = <T>(defaultValue: T) => {
  const ctx = React.createContext<StateContext<T>>({
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
