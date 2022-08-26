import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { githubAPI, Repository } from '~/shared/GithubAPI';
import styles from './Repo.module.scss';

type PathParams = { orgName: string; repoName: string };

export const Repo: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(true);
  const { orgName, repoName } = useParams<PathParams>();
  const [data, setData] = React.useState<Repository | null>(null);

  React.useEffect(() => {
    if (!orgName || !repoName) {
      navigate('/');
      return;
    }
    githubAPI
      .getRepo(orgName, repoName)
      .then(setData)
      .catch(() => navigate('/'))
      .finally(() => setLoading(false));

    // NOTE: Run effect once on component mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return <div className={styles.main}>LOADING REPO</div>;
  }

  if (!data) {
    return <div className={styles.main}>ERROR</div>;
  }

  return <div className={styles.main}>{JSON.stringify(data, null, 4)}</div>;
};
