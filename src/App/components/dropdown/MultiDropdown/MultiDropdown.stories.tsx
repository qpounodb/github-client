import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';

import { Option } from '../Option';

import MultiDropdownComponent from './MultiDropdown';

type Meta = ComponentMeta<typeof MultiDropdownComponent>;
type Story = ComponentStory<typeof MultiDropdownComponent>;

const meta: Meta = {
  title: 'Dropdown/MultiDropdown',
  component: MultiDropdownComponent,
};

export default meta;

export const MultiDropdown: Story = (props) => {
  const [selected, setSelected] = React.useState<Option[]>([]);

  const getTitle = (opts: Option[]) =>
    opts.map(({ value }) => value).join(', ');

  return (
    <MultiDropdownComponent
      {...props}
      selected={selected}
      getTitle={getTitle}
      onChange={setSelected}
    />
  );
};

const options: Option[] = [
  { key: 1, value: 'some-organization-name' },
  { key: 2, value: 'kts-school-name' },
  { key: 3, value: 'another-origanization-name' },
  { key: 4, value: 'one-more-organization' },
];

MultiDropdown.args = {
  options,
  placeholder: 'Выберите организации',
  disabled: false,
};
