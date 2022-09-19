import React from 'react';

import type { ILocalStore } from '~types';

// Support Reusable State in Effects
// https://github.com/reactwg/react-18/discussions/18
export const useLocalStore = <T extends ILocalStore>(
  create: () => T
): T | null => {
  const ref = React.useRef<null | T>(null);

  React.useEffect(() => {
    // Initialize an imperative API inside of the same effect that destroys it.
    // This way it will be recreated if the component gets remounted.
    const store = create();
    store.init();
    ref.current = store;

    return () => {
      store.destroy();
      ref.current = null;
    };
  }, [create]);

  return ref.current;
};
