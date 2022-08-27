import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '~/App/components/Button';
import { WithLoader } from '~/App/components/WithLoader';
import { RepoBranches } from './components/RepoBranches';
import { RepoCommit } from './components/RepoCommit';
import { RepoContributors } from './components/RepoContributors';
import { RepoInfo } from './components/RepoInfo';
import { RepoLangs } from './components/RepoLangs';
import { RepoReadme } from './components/RepoReadme';
import { useRepoFetch } from './hooks/useRepoFetch';
import styles from './Repo.module.scss';

type PathParams = { orgName: string; repoName: string };

export const Repo: React.FC = () => {
  const navigate = useNavigate();
  const { orgName, repoName } = useParams<PathParams>();

  const { loading, data } = useRepoFetch(orgName, repoName);

  return (
    <div className={styles.main}>
      <nav>
        <Button onClick={() => navigate('/')}>Back</Button>
      </nav>
      <WithLoader loading={loading.info} message="info">
        <RepoInfo info={data.info} />
      </WithLoader>
      <WithLoader loading={loading.branches} message="branches">
        <RepoBranches branches={data.branches} />
      </WithLoader>
      <WithLoader loading={loading.langs} message="langs">
        <RepoLangs langs={data.langs} />
      </WithLoader>
      <WithLoader loading={loading.contributors} message="contributors">
        <RepoContributors data={data.contributors} />
      </WithLoader>
      <WithLoader loading={loading.commit} message="last commit">
        <RepoCommit data={data.commit} />
      </WithLoader>
      <WithLoader loading={loading.readme} message="README">
        <RepoReadme file={data.readme} />
      </WithLoader>
    </div>
  );
};
