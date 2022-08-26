import { ComponentMeta, ComponentStory } from '@storybook/react';
import { InputSize } from './Input';
import { InputNumber as InputNumberComponent } from './InputNumber';

type Meta = ComponentMeta<typeof InputNumberComponent>;
type Story = ComponentStory<typeof InputNumberComponent>;

const meta: Meta = {
  title: 'Input/InputNumber',
  component: InputNumberComponent,
};

export default meta;

export const InputNumber: Story = (args) => <InputNumberComponent {...args} />;
InputNumber.args = {
  disabled: false,
  placeholder: '123',
  size: InputSize.l,
};
