import React from 'react';

import { PropsWithChildrenAndClassName } from '~types';
import { joinClassName } from '~utils';

import styles from './Block.module.scss';

type Props = PropsWithChildrenAndClassName;

const Block: React.FC<Props> = ({ className, children }) => {
  return (
    <div className={joinClassName(styles.root, className)}>
      <div className={styles.root__content}>{children}</div>
    </div>
  );
};

export default React.memo(Block);
