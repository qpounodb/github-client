import { RepoContributorModelCollection } from '~/App/models/github';
import { linerizeCollection } from '~/App/models/shared';
import { RepoBlock, withRepoBlock } from '../withRepoBlock';
import { Contributor } from './Contributor';
import styles from './RepoContributors.module.scss';

const RepoContributors: RepoBlock<RepoContributorModelCollection> = ({
  data,
}) => (
  <>
    <h2>Top 10 Contributors</h2>
    <div className={styles.list}>
      {linerizeCollection(data).map((c) => (
        <Contributor key={c.id} contributor={c} />
      ))}
    </div>
  </>
);

export default withRepoBlock('', RepoContributors);
