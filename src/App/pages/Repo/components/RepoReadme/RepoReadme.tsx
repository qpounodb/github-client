import React from 'react';
import { Converter } from 'showdown';
import { Readme } from '~/shared/GithubAPI';
import { isNone, Nullable } from '~/shared/utils';
import styles from './RepoReadme.module.scss';

export type RepoReadmeProps = {
  file: Nullable<Readme>;
};

const converter = new Converter();

const base64MarkdownToHTML = (str: string) => {
  return converter.makeHtml(atob(str));
};

export const RepoReadme: React.FC<RepoReadmeProps> = ({ file }) => {
  if (isNone(file)) return null;

  const __html = base64MarkdownToHTML(file.content);

  return (
    <div className={styles.main}>
      <h2>README</h2>
      <div className={styles.content} dangerouslySetInnerHTML={{ __html }} />
    </div>
  );
};
