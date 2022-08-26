import React from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { GithubRepoAPI, Repository } from '~/shared/GithubAPI';
import { RepoInfo } from './components/RepoInfo';
import styles from './Repo.module.scss';

type PathParams = { orgName: string; repoName: string };

export const Repo: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(true);
  const { orgName, repoName } = useParams<PathParams>();
  const [info, setInfo] = React.useState<Repository | null>(null);

  React.useEffect(() => {
    if (!orgName || !repoName) {
      navigate('/');
      return;
    }

    const githubRepoApi = new GithubRepoAPI(orgName, repoName);

    githubRepoApi
      .getInfo()
      .then(setInfo)
      .catch(() => navigate('/'))
      .finally(() => setLoading(false));

    // NOTE: Run effect once on component mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return (
      <div className={styles.main}>
        <nav>
          <Link to="/">Main</Link>
        </nav>
        <h1>LOADING REPO</h1>
      </div>
    );
  }

  if (!info) {
    return (
      <div className={styles.main}>
        <nav>
          <Link to="/">Main</Link>
        </nav>
        <h1>ERROR</h1>
      </div>
    );
  }

  return (
    <div className={styles.main}>
      <nav>
        <Link to="/">Main</Link>
      </nav>
      <RepoInfo info={info} />
    </div>
  );
};
