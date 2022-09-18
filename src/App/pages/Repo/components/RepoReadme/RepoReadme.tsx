import { RepoBlock, RepoBlockProps, withRepoBlock } from '../withRepoBlock';

import styles from './RepoReadme.module.scss';

export const RepoReadme: RepoBlock<string> = ({
  data,
}: RepoBlockProps<string>) => {
  return (
    <>
      <h2>README.md</h2>
      <div
        className={styles.content}
        dangerouslySetInnerHTML={{ __html: data }}
      />
    </>
  );
};

export default withRepoBlock('', RepoReadme);
