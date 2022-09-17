import { joinClassName } from '~utils';

import {
  GetClassName,
  InnerComponent,
  InnerComponentProps,
  withButton,
} from '../withButton';

import styles from './SquareButton.module.scss';

const getClassName: GetClassName = ({ size }) => {
  return joinClassName(styles.root, size && styles[`root_size-${size}`]);
};

const Square: InnerComponent = ({
  loading,
  loader,
  children,
}: InnerComponentProps) => {
  return <>{loading ? loader : children}</>;
};

export const SquareButton = withButton(getClassName, Square);
