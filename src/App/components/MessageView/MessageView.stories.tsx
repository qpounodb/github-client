import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Level } from '~/App/stores/RootStore/NotifyStore';
import MessageView from './MessageView';

type View = React.FC<{ text: string }>;
type Meta = ComponentMeta<View>;
type Story = ComponentStory<View>;

export const Message: Story = ({ text }) => {
  const time: Date = new Date();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <MessageView message={{ id: 0, level: Level.error, text, time }} />
      <MessageView message={{ id: 1, level: Level.warn, text, time }} />
      <MessageView message={{ id: 2, level: Level.info, text, time }} />
    </div>
  );
};

Message.args = {
  text: 'Lorem\n\n ipsum dolor sit, amet consectetur adipisicing elit. Excepturi\n\n\n adipisci corporis quidem, quasi repellat et?',
};

const meta: Meta = {
  title: 'Notify/Message',
  component: Message,
};
export default meta;
