import { ComponentMeta, ComponentStory } from '@storybook/react';

import CardComponent from './Card';

type Meta = ComponentMeta<typeof CardComponent>;
type Story = ComponentStory<typeof CardComponent>;

const meta: Meta = {
  title: 'Card/Card',
  component: CardComponent,
  argTypes: { onClick: { action: 'clicked' } },
};

export default meta;

export const Card: Story = (args) => <CardComponent {...args} />;
Card.args = {
  image: 'https://source.unsplash.com/random/?cat&w=150&h=150&q=80',
  placeholder: 'S',
  title: 'Title',
  subtitle: 'Subtitle',
  content: 'Content',
};
