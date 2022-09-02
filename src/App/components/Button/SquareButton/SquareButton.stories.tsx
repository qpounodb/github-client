import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Color } from '~/App/constants';
import { SquareButton as SquareButtonComponent } from './SquareButton';

type Meta = ComponentMeta<typeof SquareButtonComponent>;
type Story = ComponentStory<typeof SquareButtonComponent>;

const meta: Meta = {
  title: 'Button/SquareButton',
  component: SquareButtonComponent,
  argTypes: { onClick: { action: 'clicked' } },
};

export default meta;

export const SquareButton: Story = (args) => (
  <SquareButtonComponent {...args}>🙂</SquareButtonComponent>
);
SquareButton.args = {
  color: Color.primary,
  disabled: false,
  loading: false,
};
