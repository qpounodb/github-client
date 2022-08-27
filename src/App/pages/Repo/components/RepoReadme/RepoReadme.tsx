import React from 'react';
import { Converter } from 'showdown';
import { Readme } from '~/shared/GithubAPI';
import styles from './RepoReadme.module.scss';

export type RepoReadmeProps = {
  file: Readme;
};

const converter = new Converter();

const base64MarkdownToHTML = (str: string) => {
  return converter.makeHtml(atob(str));
};

export const RepoReadme: React.FC<RepoReadmeProps> = ({ file }) => {
  const content = React.useMemo(
    () => base64MarkdownToHTML(file.content),
    [file.content]
  );

  return (
    <div className={styles.main}>
      <h2>README</h2>
      <div
        className={styles.content}
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </div>
  );
};
