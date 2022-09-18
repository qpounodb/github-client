import React from 'react';

import { joinClassName } from '~/shared/utils';

import styles from './Switcher.module.scss';

type Props = {
  labelA: string;
  labelB: string;
  stateA: boolean;
  IconA?: SvgComponent;
  IconB?: SvgComponent;
  onChange: (stateA: boolean) => void;
};

const Switcher: React.FC<Props> = ({
  labelA,
  labelB,
  stateA,
  IconA,
  IconB,
  onChange,
}) => {
  const toggle = React.useCallback(() => onChange(!stateA), [stateA]);

  const [clsRoot, clsGrid, clsHandle, clsLabelA, clsLabelB] = React.useMemo(
    () => [
      joinClassName(styles.root),
      joinClassName(styles.root__grid, !stateA && styles.root__grid_B),
      joinClassName(styles.root__handle),
      joinClassName(styles.root__label, styles.root__label_A),
      joinClassName(styles.root__label, styles.root__label_B),
    ],
    [stateA]
  );

  return (
    <div className={clsRoot} onClick={toggle}>
      <div className={clsGrid}>
        <div className={clsLabelA}>{labelA}</div>
        <div className={clsHandle}>
          {stateA ? IconA && <IconA /> : IconB && <IconB />}
        </div>
        <div className={clsLabelB}>{labelB}</div>
      </div>
    </div>
  );
};

export default React.memo(Switcher);
