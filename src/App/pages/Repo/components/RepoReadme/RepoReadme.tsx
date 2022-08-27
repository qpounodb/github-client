import React from 'react';
import { Converter } from 'showdown';
import { Readme } from '~/shared/GithubAPI';
import { withRepoBlock } from '../withRepoBlock';
import styles from './RepoReadme.module.scss';

const converter = new Converter();

const base64MarkdownToHTML = (str: string) => {
  return converter.makeHtml(atob(str));
};

export const RepoReadme = withRepoBlock<Readme>('', ({ data: { content } }) => {
  const __html = React.useMemo(() => base64MarkdownToHTML(content), [content]);

  return (
    <>
      <h2>README.md</h2>
      <div className={styles.content} dangerouslySetInnerHTML={{ __html }} />
    </>
  );
});
