import { Route, Routes } from 'react-router-dom';
import styles from './App.module.scss';
import { Main } from './pages/Main';
import { Repo } from './pages/Repo';
import { useQueryParamsStore } from './stores/RootStore/hooks/useQueryParamsStore';

const App: React.FC = () => {
  useQueryParamsStore();

  return (
    <div className={styles.app}>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="repo/:orgName/:repoName" element={<Repo />} />
        <Route path="*" element={<h1>There's nothing here!</h1>} />
      </Routes>
    </div>
  );
};

export default App;
