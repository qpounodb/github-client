import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';
import { Size } from '~/App/constants';
import InputNumberComponent from './InputNumber';

type Meta = ComponentMeta<typeof InputNumberComponent>;
type Story = ComponentStory<typeof InputNumberComponent>;

const meta: Meta = {
  title: 'Input/InputNumber',
  component: InputNumberComponent,
};

export default meta;

export const InputNumber: Story = ({ value: init, ...rest }) => {
  const [value, setValue] = React.useState(init);
  return (
    <InputNumberComponent
      {...rest}
      value={value}
      onChange={setValue}
      onSubmit={setValue}
    />
  );
};

InputNumber.args = {
  disabled: false,
  placeholder: 'Enter number',
  size: Size.l,
  min: 1,
  max: 10,
};
