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

const getProps = (name: string): Omit<RepoBlockProps, 'state'> => ({
  loadingMessage: `${name} 👾`,
  noDataTitle: `No ${name} 😿`,
  errorTitle: `Error on fetching ${name} 🙀`,
});

export const Repo: React.FC = () => {
  const navigate = useNavigate();
  const { orgName, repoName } = useParams<PathParams>();

  const repoDataState = useRepoFetch(orgName, repoName);

  return (
    <div className={styles.main}>
      <nav>
        <Button onClick={() => navigate('/')}>Back</Button>
      </nav>
      <RepoInfo {...getProps('Info')} state={repoDataState.info} />
      <RepoBranches {...getProps('Branches')} state={repoDataState.branches} />
      <RepoLangs {...getProps('Languages')} state={repoDataState.langs} />
      <RepoContributors
        {...getProps('Contributors')}
        state={repoDataState.contributors}
      />
      <RepoCommit {...getProps('Last Commit')} state={repoDataState.commit} />
      <RepoReadme {...getProps('README.md')} state={repoDataState.readme} />
    </div>
  );
};
