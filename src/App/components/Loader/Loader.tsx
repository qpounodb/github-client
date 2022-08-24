import React from 'react';
import { classname, PropsWithClassName } from '~/shared/utils';
import { Locators } from '~/__test__/constants';
import styles from './Loader.module.scss';

export enum LoaderSize {
  s = 's',
  m = 'm',
  l = 'l',
}

export type LoaderProps = PropsWithClassName<{
  loading?: boolean;
  size?: LoaderSize;
}>;

export const Loader: React.FC<LoaderProps> = ({
  loading = true,
  size = LoaderSize.m,
  className,
}) => {
  if (!loading) return null;
  const cls = classname(styles.loader, styles[`size_${size}`], className);
  return <div className={cls} data-testid={Locators.LOADER}></div>;
};
