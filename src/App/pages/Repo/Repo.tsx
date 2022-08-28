import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '~/App/components/Button';
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

  const repoDataState = useRepoFetch(orgName, repoName);

  return (
    <div className={styles.main}>
      <nav>
        <Button onClick={() => navigate('/')}>Back</Button>
      </nav>
      <RepoInfo title="Info" state={repoDataState.info} />
      <RepoBranches title="Branches" state={repoDataState.branches} />
      <RepoLangs title="Languages" state={repoDataState.langs} />
      <RepoContributors
        title="Contributors"
        state={repoDataState.contributors}
      />
      <RepoCommit title="Last Commit" state={repoDataState.commit} />
      <RepoReadme title="README.md" state={repoDataState.readme} />
    </div>
  );
};
