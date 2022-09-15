import { RepoLangsModel } from '~/App/models/github';

import { RepoBlock, RepoBlockProps, withRepoBlock } from '../withRepoBlock';

import { Lang } from './Lang';
import styles from './RepoLangs.module.scss';

const getTotal = (langs: RepoLangsModel) => {
  return Object.values(langs).reduce((acc, x) => acc + x, 0);
};

const RepoLangs: RepoBlock<RepoLangsModel> = ({
  data,
}: RepoBlockProps<RepoLangsModel>) => {
  const total = getTotal(data);
  return (
    <>
      <h2>Project Programming Languages</h2>
      <div className={styles.list}>
        {Object.entries(data).map(([lang, count]) => (
          <Lang key={lang} {...{ lang, count, total }} />
        ))}
      </div>
    </>
  );
};

export default withRepoBlock('', RepoLangs);
