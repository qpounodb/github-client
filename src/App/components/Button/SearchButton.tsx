import React from 'react';
import { SvgFind } from '../Svg';
import { SquareButton, SquareButtonProps } from './SquareButton';

export type SearchButtonProps = Omit<SquareButtonProps, 'children'> & {
  loading?: boolean;
};

export const SearchButton: React.FC<SearchButtonProps> = ({ ...rest }) => {
  return (
    <SquareButton {...rest}>
      <SvgFind />
    </SquareButton>
  );
};
