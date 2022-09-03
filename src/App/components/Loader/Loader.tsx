import React from 'react';
import { Color, Size } from '~/App/constants';
import { PropsWithClassName } from '~/shared/types';
import { joinClassName } from '~/shared/utils';
import { Locators } from '~/__test__/constants';
import styles from './Loader.module.scss';

export type LoaderProps = PropsWithClassName<{
  loading?: boolean;
  size?: Size;
  color?: Color;
}>;

export const Loader: React.FC<LoaderProps> = ({
  loading = true,
  size = Size.m,
  color = Color.primary,
  className,
}) => {
  if (!loading) return null;

  return (
    <div
      className={joinClassName(
        styles.root,
        styles[`root_${color}`],
        styles[`root_size-${size}`],
        className
      )}
      data-testid={Locators.LOADER}
    ></div>
  );
};
