import { ComponentMeta, ComponentStory } from '@storybook/react';

import { Size } from '~constants';

import LoaderComponent from './Loader';

type Meta = ComponentMeta<typeof LoaderComponent>;
type Story = ComponentStory<typeof LoaderComponent>;

export default {
  title: 'Loader/Loader',
  component: LoaderComponent,
} as Meta;

export const Loader: Story = (args) => <LoaderComponent {...args} />;
Loader.args = {
  size: Size.m,
};
