import { Outlet } from 'react-router-dom';
import styles from './App.module.scss';
import { GithubReposProvider } from './pages/Main/hooks/useGithubReposCtx';

export const App: React.FC = () => {
  return (
    <GithubReposProvider>
      <div className={styles.app}>
        <Outlet />
      </div>
    </GithubReposProvider>
  );
};
