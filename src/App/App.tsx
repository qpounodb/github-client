import { Link, Route, Routes } from 'react-router-dom';
import styles from './App.module.scss';
import { GithubReposProvider } from './hooks/useGithubReposCtx';
import { Main } from './pages/Main';
import { Repo } from './pages/Repo';

export const App: React.FC = () => {
  return (
    <GithubReposProvider>
      <div className={styles.app}>
        <nav>
          <Link to="/">Main</Link>
        </nav>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="repo/:orgName/:repoName" element={<Repo />} />
        </Routes>
      </div>
    </GithubReposProvider>
  );
};
