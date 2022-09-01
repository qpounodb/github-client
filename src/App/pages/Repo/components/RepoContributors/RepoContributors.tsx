import { Contributor as ContributorModel } from '~/shared/GithubAPI/types';
import { withRepoBlock } from '../withRepoBlock';
import { Contributor } from './Contributor';
import styles from './RepoContributors.module.scss';

export const RepoContributors = withRepoBlock<ContributorModel[]>(
  '',
  ({ data }) => (
    <>
      <h2>Top 10 Contributors</h2>
      <div className={styles.list}>
        {data.map((c) => (
          <Contributor key={c.id} contributor={c} />
        ))}
      </div>
    </>
  )
);
