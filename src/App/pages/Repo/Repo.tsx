import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '~/App/components/Button';
import { RepoBranches } from './components/RepoBranches';
import { RepoCommit } from './components/RepoCommit';
import { RepoContributors } from './components/RepoContributors';
import { RepoInfo } from './components/RepoInfo';
import { RepoLangs } from './components/RepoLangs';
import { RepoReadme } from './components/RepoReadme';
import { RepoBlockProps } from './components/withRepoBlock';
import { useRepoFetch } from './hooks/useRepoFetch';
import styles from './Repo.module.scss';

type PathParams = { orgName: string; repoName: string };

const getProps = (name: string): Omit<RepoBlockProps, 'data' | 'loading'> => ({
  loadingMessage: `${name} 👾`,
  noDataTitle: `No ${name} 😿`,
  errorTitle: `Error on fetching ${name} 🙀`,
});

export const Repo: React.FC = () => {
  const navigate = useNavigate();
  const { orgName, repoName } = useParams<PathParams>();

  const { loading, data } = useRepoFetch(orgName, repoName);

  return (
    <div className={styles.main}>
      <nav>
        <Button onClick={() => navigate('/')}>Back</Button>
      </nav>
      <RepoInfo {...getProps('Info')} data={data.info} loading={loading.info} />
      <RepoBranches
        {...getProps('Branches')}
        data={data.branches}
        loading={loading.branches}
      />
      <RepoLangs
        {...getProps('Languages')}
        data={data.langs}
        loading={loading.langs}
      />
      <RepoContributors
        {...getProps('Contributors')}
        data={data.contributors}
        loading={loading.contributors}
      />
      <RepoCommit
        {...getProps('Last Commit')}
        data={data.commit}
        loading={loading.commit}
      />
      <RepoReadme
        {...getProps('README.md')}
        data={data.readme}
        loading={loading.readme}
      />
    </div>
  );
};
