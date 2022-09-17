import React from 'react';

import { Color, Size } from '~constants';
import { Locators } from '~tests/constants';
import type { PropsWithClassName } from '~types';
import { joinClassName } from '~utils';

import styles from './Loader.module.scss';

export type LoaderProps = PropsWithClassName<{
  loading?: boolean;
  size?: Size;
  color?: Color;
}>;

const Loader: React.FC<LoaderProps> = ({
  loading = true,
  size = Size.m,
  color = Color.primary,
  className,
}) => {
  return (
    <div
      className={joinClassName(
        styles.root,
        loading && styles.root_loading,
        styles[`root_${color}`],
        styles[`root_size-${size}`],
        className
      )}
      data-testid={Locators.LOADER}
    ></div>
  );
};

export default React.memo(Loader);
