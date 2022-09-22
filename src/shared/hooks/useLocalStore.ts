import React from 'react';

import type { ILocalStore } from '~types';

// Support Reusable State in Effects
// https://github.com/reactwg/react-18/discussions/18

export const useLocalStore = <T extends ILocalStore>(create: () => T): T => {
  const ref = React.useRef<null | T>(null);
  ref.current ??= create();

  React.useEffect(() => {
    ref.current ??= create();
    ref.current.init();

    return () => {
      ref.current?.destroy();
      ref.current = null;
    };
  }, [create]);

  return ref.current;
};
