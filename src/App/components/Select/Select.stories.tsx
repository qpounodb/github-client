import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';
import { Select as SelectComponent } from './Select';
import { Option } from './types';

type Meta = ComponentMeta<typeof SelectComponent>;
type Story = ComponentStory<typeof SelectComponent>;

const meta: Meta = {
  title: 'Input/Select',
  component: SelectComponent,
};

export default meta;

export const Select: Story = ({
  selected: initialSelected,
  onChange,
  ...rest
}) => {
  const [selected, setSelected] = React.useState(initialSelected);

  React.useEffect(() => setSelected(initialSelected), [initialSelected]);

  const handleChange: typeof onChange = (selected) => {
    setSelected(selected);
    onChange(selected);
  };

  return (
    <SelectComponent {...rest} selected={selected} onChange={handleChange} />
  );
};

const options: Option[] = [
  { key: 1, value: 'some-organization-name' },
  { key: 2, value: 'kts-school-name' },
  { key: 3, value: 'another-origanization-name' },
  { key: 4, value: 'one-more-organization' },
];

Select.args = {
  options,
  selected: null,
  placeholder: 'Выберите организацию',
  disabled: false,
};
