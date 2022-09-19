import React from 'react';

import { ExternalLink, ExternalLinkProps } from '~/App/components/ExternalLink';

import Picture from './assets/404.svg';
import styles from './NotFound.module.scss';

const pictureWebOrigin: ExternalLinkProps = {
  url: 'https://storyset.com/web',
  title: 'Web illustrations by Storyset',
};

const NotFound: React.FC = () => {
  return (
    <div className={styles.root}>
      <div className={styles.root__hero}>
        <Picture className={styles.root__picture} />
      </div>
      <div>
        <ExternalLink url={pictureWebOrigin.url}>
          {pictureWebOrigin.title}
        </ExternalLink>
        <a href=""></a>
      </div>
    </div>
  );
};

export default React.memo(NotFound);
