import { observer } from 'mobx-react-lite';
import React from 'react';

import { ThemeProvider } from '~/shared/hooks/themeCtx';
import { Header } from '~components/Header';
import { NotifyView } from '~components/NotifyView';
import { useRoutes } from '~configs/routes';
import { rootStore, useQueryParamsStore } from '~stores/RootStore';

import styles from './App.module.scss';
import { Footer } from './components/Footer';

const App: React.FC = () => {
  useQueryParamsStore();

  const routes = useRoutes();

  const handleMessageClose = React.useCallback(
    (id: number) => rootStore.notifyStore.remove(id),
    []
  );

  return (
    <ThemeProvider>
      <div className={styles.root}>
        <Header />
        <main className={styles.root__main}>{routes}</main>
        <Footer />
      </div>
      <NotifyView
        messages={rootStore.notifyStore.messages}
        onClose={handleMessageClose}
      />
    </ThemeProvider>
  );
};

export default observer(App);
