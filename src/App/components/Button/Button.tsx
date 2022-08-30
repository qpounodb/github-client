import React from 'react';
import { Loader, LoaderSize } from '~/App/components/Loader';
import { joinClassName } from '~/shared/utils';
import { BaseButton, BaseButtonProps, ButtonColor } from './BaseButton';
import styles from './Button.module.scss';

export type ButtonProps = { loading?: boolean } & BaseButtonProps;

export const Button: React.FC<ButtonProps> = ({
  className = '',
  loading = false,
  color = ButtonColor.primary,
  children,
  ...rest
}) => {
  const disabled = rest.disabled || loading;

  const cls = joinClassName(
    styles[color],
    loading && styles.loading,
    className
  );

  return (
    <BaseButton {...rest} color={color} disabled={disabled} className={cls}>
      {loading && (
        <div>
          <Loader size={LoaderSize.s} className={styles.loader} />
        </div>
      )}
      <div>{children}</div>
    </BaseButton>
  );
};
