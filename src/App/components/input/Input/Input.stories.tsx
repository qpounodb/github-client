import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';

import InputComponent from './Input';

type Meta = ComponentMeta<typeof InputComponent>;
type Story = ComponentStory<typeof InputComponent>;

const meta: Meta = {
  title: 'Input/Input',
  component: InputComponent,
};

export default meta;

export const Input: Story = (props) => {
  const [value, setValue] = React.useState<string | undefined>(undefined);
  return (
    <InputComponent
      {...props}
      value={value}
      onChange={setValue}
      onSubmit={setValue}
    />
  );
};

Input.args = {
  disabled: false,
  placeholder: 'Введите название организации',
};
