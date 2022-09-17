import React from 'react';
import { Route, Routes } from 'react-router-dom';

import { Main, Repo, NotFound } from '~pages';

const routes: Record<string, React.FC> = {
  '/': Main,
  'repo/:orgName/:repoName': Repo,
  '*': NotFound,
};

const getRoutes = (): JSX.Element => (
  <Routes>
    {Object.entries(routes).map(([path, Component]) => (
      <Route key={path} path={path} element={<Component />} />
    ))}
  </Routes>
);

export const useRoutes = (): JSX.Element => {
  return React.useMemo(() => getRoutes(), []);
};
