import { BrowserRouter, Route, Routes } from 'react-router-dom';
import styles from './App.module.scss';
import { Main } from './pages/Main';
import { Repo } from './pages/Repo';

export const App: React.FC = () => {
  return (
    <div className={styles.app}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="repo/:orgName/:repoName" element={<Repo />} />
          <Route path="*" element={<h1>There's nothing here!</h1>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};
