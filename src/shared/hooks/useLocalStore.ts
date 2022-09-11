import React from 'react';

export interface ILocalStore {
  init(): void;
  destroy(): void;
}

export const useLocalStore = <T extends ILocalStore>(create: () => T): T => {
  const ref = React.useRef<null | T>(null);

  if (ref.current === null) {
    ref.current = create();
  }

  React.useEffect(() => {
    ref.current?.init();
    return () => ref.current?.destroy();
  }, []);

  return ref.current;
};
