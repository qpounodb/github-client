import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';

import { Option } from '../types';

import SelectComponent from './Select';

type Meta = ComponentMeta<typeof SelectComponent>;
type Story = ComponentStory<typeof SelectComponent>;

const meta: Meta = {
  title: 'Dropdown/Select',
  component: SelectComponent,
};

export default meta;

export const Select: Story = (props) => {
  const [selected, setSelected] = React.useState<Option | undefined>(undefined);

  return (
    <div style={{ maxWidth: '300px' }}>
      <SelectComponent {...props} selected={selected} onChange={setSelected} />
    </div>
  );
};

const options: Option[] = [
  { key: 1, value: 'some-organization-name' },
  { key: 2, value: 'kts-school-name' },
  { key: 3, value: 'another-organization-name' },
  { key: 4, value: 'one-more-organization' },
];

Select.args = {
  options,
  placeholder: 'Выберите организацию',
  disabled: false,
};
