import { IconBranch } from '~/App/assets/icons';
import { Branch } from '~/shared/GithubAPI';
import { withRepoBlock } from '../withRepoBlock';
import styles from './RepoBranches.module.scss';

const noVersionNum = ({ name }: Branch): boolean => !/\d/.test(name);

export const RepoBranches = withRepoBlock<Branch[]>('', ({ data }) => (
  <>
    <h2>Branches</h2>
    <div className={styles.list}>
      {data.filter(noVersionNum).map(({ name }) => (
        <div className={styles.item} key={name}>
          <IconBranch /> {name}
        </div>
      ))}
    </div>
  </>
));
