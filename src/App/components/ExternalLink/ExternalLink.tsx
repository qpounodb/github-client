import React from 'react';

import { PropsWithChildrenAndClassName } from '~types';
import { joinClassName as join } from '~utils';

import styles from './ExternalLink.module.scss';

type AnchorHTMLProps = React.AnchorHTMLAttributes<HTMLAnchorElement>;

export type ExternalLinkProps = PropsWithChildrenAndClassName<{
  url: string;
}> &
  Omit<AnchorHTMLProps, 'href'>;

const ExternalLink: React.FC<ExternalLinkProps> = ({
  url,
  className,
  children,
  ...rest
}) => {
  return (
    <a
      {...rest}
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={join(styles.root, className)}
    >
      {children}
    </a>
  );
};

export default React.memo(ExternalLink);
