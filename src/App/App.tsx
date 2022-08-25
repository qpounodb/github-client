import { Link, Route, Routes } from 'react-router-dom';
import styles from './App.module.scss';
import { GithubReposProvider } from './hooks/useGithubReposCtx';
import { Main } from './pages/Main';

export const App: React.FC = () => {
  return (
    <GithubReposProvider>
      <div className={styles.app}>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
        </nav>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="about" element={<div>About</div>} />
        </Routes>
      </div>
    </GithubReposProvider>
  );
};
