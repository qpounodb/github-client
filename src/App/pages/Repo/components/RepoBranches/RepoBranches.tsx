import { IconBranch } from '~/App/assets/icons';
import {
  RepoBranchModel,
  RepoBranchModelCollection,
} from '~/App/models/github';
import { linerizeCollection } from '~/App/models/shared';

import { RepoBlock, RepoBlockProps, withRepoBlock } from '../withRepoBlock';

import styles from './RepoBranches.module.scss';

const noVersionNum = ({ name }: RepoBranchModel): boolean => !/\d/.test(name);

const RepoBranches: RepoBlock<RepoBranchModelCollection> = ({
  data,
}: RepoBlockProps<RepoBranchModelCollection>) => (
  <>
    <h2>Branches</h2>
    <div className={styles.list}>
      {linerizeCollection(data)
        .filter(noVersionNum)
        .map(({ name }) => (
          <div className={styles.item} key={name}>
            <IconBranch /> {name}
          </div>
        ))}
    </div>
  </>
);

export default withRepoBlock('', RepoBranches);
