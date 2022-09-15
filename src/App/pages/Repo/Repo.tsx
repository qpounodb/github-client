import { observer } from 'mobx-react-lite';
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { Button } from '~components/button';
import { useLocalStore } from '~hooks';

import {
  RepoBranches,
  RepoCommit,
  RepoContributors,
  RepoInfo,
  RepoLangs,
  RepoReadme,
} from './components';
import styles from './Repo.module.scss';
import { RepoStore } from './stores';

type PathParams = { orgName: string; repoName: string };

export const Repo: React.FC = () => {
  const navigate = useNavigate();
  const { orgName, repoName } = useParams<PathParams>();
  const store = useLocalStore(() => new RepoStore(orgName, repoName));

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className={styles.root}>
      <nav>
        <Button onClick={handleBack}>Back</Button>
      </nav>
      <RepoInfo title="Info" state={store.state.info} />
      <RepoBranches title="Branches" state={store.state.branches} />
      <RepoLangs title="Languages" state={store.state.langs} />
      <RepoContributors title="Contributors" state={store.state.contributors} />
      <RepoCommit title="Last Commit" state={store.state.commit} />
      <RepoReadme title="README.md" state={store.state.readme} />
    </div>
  );
};

export default observer(Repo);
