import { BrowserRouter, Route, Routes } from 'react-router-dom';
import styles from './App.module.scss';
import { Main } from './pages/Main';
import { GithubReposProvider } from './pages/Main/hooks/useGithubReposCtx';
import { Repo } from './pages/Repo';

export const App: React.FC = () => {
  return (
    <GithubReposProvider>
      <div className={styles.app}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="org/:orgName" element={<Main />} />
            <Route path="org/:orgName/:pageNum" element={<Main />} />
            <Route path="repo/:orgName/:repoName" element={<Repo />} />
            <Route path="*" element={<h1>There's nothing here!</h1>} />
          </Routes>
        </BrowserRouter>
      </div>
    </GithubReposProvider>
  );
};
