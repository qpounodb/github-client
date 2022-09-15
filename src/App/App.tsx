import { observer } from 'mobx-react-lite';
import React from 'react';
import { Route, Routes } from 'react-router-dom';

import { NotifyView } from '~/App/components/NotifyView';
import { Main } from '~/App/pages/Main';
import { Repo } from '~/App/pages/Repo';
import { rootStore } from '~/App/stores/RootStore';
import { useQueryParamsStore } from '~/App/stores/RootStore/hooks';

import styles from './App.module.scss';

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
