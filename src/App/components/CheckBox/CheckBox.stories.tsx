import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';

import CheckBoxComponent from './CheckBox';

type Meta = ComponentMeta<typeof CheckBoxComponent>;
type Story = ComponentStory<typeof CheckBoxComponent>;

const meta: Meta = {
  title: 'Input/CheckBox',
  component: CheckBoxComponent,
};
export default meta;

export const CheckBox: Story = (props) => {
  const [isChecked, setChecked] = React.useState(false);

  return (
    <CheckBoxComponent {...props} checked={isChecked} onChange={setChecked} />
  );
};

CheckBox.args = {
  disabled: false,
};
