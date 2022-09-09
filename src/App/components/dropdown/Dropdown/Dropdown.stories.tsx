import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';
import { Option } from '../Option';
import DropdownComponent, { DropdownProps } from './Dropdown';

type DropdownView = React.FC<Pick<DropdownProps, 'disabled' | 'hideOnChange'>>;

type Meta = ComponentMeta<DropdownView>;
type Story = ComponentStory<DropdownView>;

const options: Option[] = [
  { key: 1, value: '1' },
  { key: 2, value: '2' },
  { key: 3, value: '3' },
  { key: 4, value: '4' },
];

export const Dropdown: Story = (props) => {
  const [selected, setSelected] = React.useState<Option[]>([]);

  const isSelected = (option: Option) => selected.includes(option);

  const handleChange = React.useCallback(
    (option: Option, wasSelected: boolean) =>
      setSelected(
        (wasSelected
          ? selected.filter((o) => o !== option)
          : [...selected, option]
        ).slice(-2)
      ),
    [selected]
  );

  const title = React.useMemo(() => {
    if (selected.length === 0) return '';
    if (selected.length === 1) return selected[0].value;
    const sum = selected.reduce((acc, o) => acc + Number(o.key), 0);
    return `${selected.map((o) => o.value).join(' + ')} = ${sum}`;
  }, [selected]);

  return (
    <DropdownComponent
      {...props}
      options={options}
      isSelected={isSelected}
      title={title}
      placeholder={'Выберите числа'}
      onChange={handleChange}
    />
  );
};

Dropdown.args = {
  disabled: false,
  hideOnChange: false,
};

const meta: Meta = {
  title: 'Dropdown/Dropdown',
  component: Dropdown,
};

export default meta;
