import { RepoContributorModelCollection } from '~/App/models/GitHub';
import { linerizeCollection } from '~/App/models/shared';
import { withRepoBlock } from '../withRepoBlock';
import { Contributor } from './Contributor';
import styles from './RepoContributors.module.scss';

export const RepoContributors = withRepoBlock<RepoContributorModelCollection>(
  '',
  ({ data }) => (
    <>
      <h2>Top 10 Contributors</h2>
      <div className={styles.list}>
        {linerizeCollection(data).map((c) => (
          <Contributor key={c.id} contributor={c} />
        ))}
      </div>
    </>
  )
);
