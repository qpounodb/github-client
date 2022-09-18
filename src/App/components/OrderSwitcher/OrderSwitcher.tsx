import React from 'react';

import { IconTriangle } from '~/App/assets/icons';
import { joinClassName as join } from '~/shared/utils';

import { default as s } from './OrderSwitcher.module.scss';

type Props = {
  asc: boolean;
  onChange: (asc: boolean) => void;
  disabled?: boolean;
};

const OrderSwitcher: React.FC<Props> = ({ asc, onChange, disabled }) => {
  const toggle = React.useCallback(
    () => !disabled && onChange(!asc),
    [asc, disabled, onChange]
  );

  const [clsRoot, clsArrowAsc, clsArrowDesc] = React.useMemo(
    () => [
      join(s.root, disabled && s.root_disabled),
      join(s.root__arrow, s.root__arrow_asc, !asc && s.root__arrow_small),
      join(s.root__arrow, s.root__arrow_desc, asc && s.root__arrow_small),
    ],
    [asc, disabled]
  );

  return (
    <div className={clsRoot} onClick={toggle}>
      <div className={clsArrowAsc}>
        <IconTriangle />
      </div>
      <div className={clsArrowDesc}>
        <IconTriangle />
      </div>
    </div>
  );
};

export default React.memo(OrderSwitcher);
