import { observer } from 'mobx-react-lite';
import React from 'react';

import { NotifyView } from '~components/NotifyView';
import { rootStore, useQueryParamsStore } from '~stores/RootStore';

import styles from './App.module.scss';
import { useRoutes } from './configs/routes';

const App: React.FC = () => {
  useQueryParamsStore();

  const routes = useRoutes();

  const handleMessageClose = React.useCallback(
    (id: number) => rootStore.notifyStore.remove(id),
    []
  );

  return (
    <div className={styles.app}>
      {routes}
      <NotifyView
        messages={rootStore.notifyStore.messages}
        onClose={handleMessageClose}
      />
    </div>
  );
};

export default observer(App);
