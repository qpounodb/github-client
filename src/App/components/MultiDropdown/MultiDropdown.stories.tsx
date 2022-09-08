import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';
import MultiDropdownComponent from './MultiDropdown';
import { Option } from './types';

type Meta = ComponentMeta<typeof MultiDropdownComponent>;
type Story = ComponentStory<typeof MultiDropdownComponent>;

const meta: Meta = {
  title: 'Input/MultiDropdown',
  component: MultiDropdownComponent,
};

export default meta;

export const MultiDropdown: Story = ({
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
    <MultiDropdownComponent
      {...rest}
      selected={selected}
      onChange={handleChange}
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
  selected: [],
  placeholder: 'Выберите организации',
  pluralizeOptions: (opts: Option[]) =>
    opts.map(({ value }) => value).join(', '),
  disabled: false,
};
