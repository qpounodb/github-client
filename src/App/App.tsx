import { observer } from 'mobx-react-lite';
import React from 'react';
import { Route, Routes } from 'react-router-dom';

import { NotifyView } from '~components/NotifyView';
import { rootStore, useQueryParamsStore } from '~stores/RootStore';

import styles from './App.module.scss';
import { Main } from './pages/Main';
import { Repo } from './pages/Repo';

const App: React.FC = () => {
  useQueryParamsStore();

  const handleMessageClose = React.useCallback(
    (id: number) => rootStore.notifyStore.remove(id),
    []
  );

  return (
    <div className={styles.app}>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="repo/:orgName/:repoName" element={<Repo />} />
        <Route path="*" element={<h1>There&apos;s nothing here!</h1>} />
      </Routes>
      <NotifyView
        messages={rootStore.notifyStore.messages}
        onClose={handleMessageClose}
      />
    </div>
  );
};

export default observer(App);
