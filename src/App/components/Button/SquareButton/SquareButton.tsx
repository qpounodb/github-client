import React from 'react';
import { Loader, LoaderSize } from '~/App/components/Loader';
import { classname } from '~/shared/utils';
import { BaseButton, BaseButtonProps, ButtonColor } from '../BaseButton';
import styles from './SquareButton.module.scss';

export enum ButtonSize {
  s = 's',
  m = 'm',
  l = 'l',
}

export type SquareButtonProps = BaseButtonProps & {
  size?: ButtonSize;
  loading?: boolean;
};

export const SquareButton: React.FC<SquareButtonProps> = ({
  className = '',
  color = ButtonColor.primary,
  size = ButtonSize.l,
  loading = false,
  children,
  ...rest
}) => {
  const disabled = rest.disabled || loading;

  const cls = classname(
    styles.main,
    styles[color],
    styles[`size_${size}`],
    loading && styles.loading,
    className
  );

  return (
    <BaseButton {...rest} color={color} className={cls} disabled={disabled}>
      {loading ? (
        <Loader size={LoaderSize.s} className={styles.loader} />
      ) : (
        children
      )}
    </BaseButton>
  );
};
