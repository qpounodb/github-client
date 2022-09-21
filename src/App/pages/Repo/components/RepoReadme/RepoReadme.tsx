import { RepoBlock, RepoBlockProps, withRepoBlock } from '../withRepoBlock';

import styles from './RepoReadme.module.scss';

export const RepoReadme: RepoBlock<string> = ({
  data,
  className,
}: RepoBlockProps<string>) => {
  if (!data || typeof data !== 'string') return null;

  return (
    <div className={className}>
      <h2>README.md</h2>
      <div
        className={styles.content}
        dangerouslySetInnerHTML={{ __html: data }}
      />
    </div>
  );
};

export default withRepoBlock('', RepoReadme);
