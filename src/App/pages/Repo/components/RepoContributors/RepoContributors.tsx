import { Contributor } from '~/shared/GithubAPI/types';
import { withRepoBlock } from '../withRepoBlock';
import { RepoContributor } from './RepoContributor';
import styles from './RepoContributors.module.scss';

export const RepoContributors = withRepoBlock<Contributor[]>('', ({ data }) => (
  <>
    <h2>Top 10 Contributors</h2>
    <div className={styles.list}>
      {data.map((c) => (
        <RepoContributor key={c.id} contributor={c} />
      ))}
    </div>
  </>
));
