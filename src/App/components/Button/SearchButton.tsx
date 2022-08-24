import React from 'react';
import { SvgFind } from '~/App/components/Svg';
import { classname } from '~/shared/utils';
import { BaseButton, BaseButtonProps, ButtonColor } from './BaseButton';
import styles from './SearchButton.module.scss';

export type SearchButtonProps = Omit<BaseButtonProps, 'children'>;

export const SearchButton: React.FC<SearchButtonProps> = ({
  className = '',
  color = ButtonColor.primary,
  ...rest
}) => {
  const cls = classname(styles.button, styles[color], className);

  return (
    <BaseButton {...rest} color={color} className={cls}>
      <SvgFind />
    </BaseButton>
  );
};
