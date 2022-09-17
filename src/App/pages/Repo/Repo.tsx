import { observer } from 'mobx-react-lite';
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { Button } from '~components/button';
import { WithLoader } from '~components/WithLoader';
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
      <WithLoader loading={store?.isLoading} className={styles.root}>
        <RepoInfo data={store?.dataMap?.info} />
        <RepoBranches data={store?.dataMap?.branches} />
        <RepoLangs data={store?.dataMap?.languages} />
        <RepoContributors data={store?.dataMap?.contributors} />
        <RepoCommit data={store?.dataMap?.commit} />
        <RepoReadme data={store?.dataMap?.readme} />
      </WithLoader>
    </div>
  );
};

export default observer(Repo);
