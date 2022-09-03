import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '~/App/components/Button';
import { useGithubReposCtx } from '~/App/pages/Main/hooks/useGithubReposCtx';
// import { RepoBranches } from './components/RepoBranches';
import { RepoCommit } from './components/RepoCommit';
import { RepoContributors } from './components/RepoContributors';
import { RepoInfo } from './components/RepoInfo';
import { RepoLangs } from './components/RepoLangs';
// import { RepoReadme } from './components/RepoReadme';
import { useRepoFetch } from './hooks/useRepoFetch';
import styles from './Repo.module.scss';

type PathParams = { orgName: string; repoName: string };

export const Repo: React.FC = () => {
  const navigate = useNavigate();
  const { orgName, repoName } = useParams<PathParams>();
  const { state: reposState } = useGithubReposCtx();

  const state = useRepoFetch(orgName, repoName);

  const handleBack = () => {
    const org = reposState.orgName || orgName;
    const page = reposState.params.page || 1;
    navigate(`/org/${org}/${page}`);
  };

  return (
    <div className={styles.root}>
      <nav>
        <Button onClick={handleBack}>Back</Button>
      </nav>
      <RepoInfo title="Info" state={state.info} />
      {/* <RepoBranches title="Branches" state={state.branches} /> */}
      <RepoLangs title="Languages" state={state.langs} />
      <RepoContributors title="Contributors" state={state.contributors} />
      <RepoCommit title="Last Commit" state={state.commit} />
      {/* <RepoReadme title="README.md" state={state.readme} /> */}
    </div>
  );
};
