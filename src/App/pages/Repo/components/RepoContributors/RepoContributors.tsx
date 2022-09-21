import { RepoContributorModelCollection } from '~models/github';
import { linerizeCollection } from '~models/shared';

import { RepoBlock, RepoBlockProps, withRepoBlock } from '../withRepoBlock';

import { Contributor } from './components';
import styles from './RepoContributors.module.scss';

const RepoContributors: RepoBlock<RepoContributorModelCollection> = ({
  data,
  className,
}: RepoBlockProps<RepoContributorModelCollection>) => (
  <div className={className}>
    <h2>Top 10 Contributors</h2>
    <div className={styles.list}>
      {linerizeCollection(data).map((c) => (
        <Contributor key={c.id} contributor={c} />
      ))}
    </div>
  </div>
);

export default withRepoBlock('', RepoContributors);
