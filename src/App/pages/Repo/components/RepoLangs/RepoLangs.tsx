import { Languages } from '~/shared/GithubAPI';
import { withRepoBlock } from '../withRepoBlock';
import { Lang } from './Lang';
import styles from './RepoLangs.module.scss';

const getTotal = (langs: Languages) => {
  return Object.values(langs).reduce((acc, x) => acc + x, 0);
};

export const RepoLangs = withRepoBlock<Languages>('', ({ data }) => {
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
});
