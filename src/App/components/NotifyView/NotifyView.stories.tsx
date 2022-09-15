import { ComponentMeta, ComponentStory } from '@storybook/react';

import { Level } from '~/App/stores/RootStore/NotifyStore';
import { randomItem, randomRange, shuffleItems } from '~/shared/utils';

import NotifyView from './NotifyView';

type Meta = ComponentMeta<typeof NotifyView>;
type Story = ComponentStory<typeof NotifyView>;

const meta: Meta = {
  title: 'Notify/View',
  component: NotifyView,
};
export default meta;

export const View: Story = (args) => {
  return (
    <div
      style={{
        position: 'relative',
        width: 'calc(100vw - 2 * 16px)',
        height: 'calc(100vh - 2 * 16px)',
        background: 'linear-gradient(10deg, #ff0, #08f)',
      }}
    >
      <NotifyView {...args} />
    </div>
  );
};

const text =
  'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Illo nihil animi facilis asperiores officia? In ratione modi nihil velit distinctio excepturi dolor quae autem commodi, iste, quod illum reprehenderit quidem!';

const levels = Object.values(Level);

View.args = {
  messages: Array.from({ length: 10 }).map((_, id) => ({
    id,
    level: randomItem(levels),
    text: shuffleItems(text.split(''))
      .slice(0, randomRange(text.length / 3)(text.length - 1))
      .join(''),
    time: new Date(Date.now() + id * 1000),
  })),
};
