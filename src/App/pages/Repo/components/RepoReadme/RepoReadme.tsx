import React from 'react';
import { Converter } from 'showdown';

import { RepoReadmeModel } from '~models/github';

import { RepoBlock, RepoBlockProps, withRepoBlock } from '../withRepoBlock';

import styles from './RepoReadme.module.scss';

const converter = new Converter();
converter.setFlavor('github');

const base64DecodeUnicode = (encoded: string): string => {
  const raw = atob(encoded)
    .split('')
    .map((c) => `%${`00${c.charCodeAt(0).toString(16)}`.slice(-2)}`)
    .join('');
  return decodeURIComponent(raw);
};

const base64MarkdownToHTML = (encoded: string) => {
  const markdown = base64DecodeUnicode(encoded);
  return converter.makeHtml(markdown);
};

export const RepoReadme: RepoBlock<RepoReadmeModel> = ({
  data: { content },
}: RepoBlockProps<RepoReadmeModel>) => {
  const __html = React.useMemo(() => base64MarkdownToHTML(content), [content]);

  return (
    <>
      <h2>README.md</h2>
      <div className={styles.content} dangerouslySetInnerHTML={{ __html }} />
    </>
  );
};

export default withRepoBlock('', RepoReadme);
