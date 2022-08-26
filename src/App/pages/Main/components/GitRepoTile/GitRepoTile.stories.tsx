import { ComponentMeta, ComponentStory } from '@storybook/react';
import { API_DATA_EXAMPLE } from './API_DATA_EXAMPLE';

import { GitRepoTile as GitRepoTileComponent } from './GitRepoTile';

type Meta = ComponentMeta<typeof GitRepoTileComponent>;
type Story = ComponentStory<typeof GitRepoTileComponent>;

const meta: Meta = {
  title: 'Main Page/Git-Repo-Tile',
  component: GitRepoTileComponent,
  argTypes: { onClick: { action: 'clicked' } },
};

export default meta;

export const GitRepoTile: Story = (args) => <GitRepoTileComponent {...args} />;
GitRepoTile.args = {
  placeholder: 'К',
  apiData: API_DATA_EXAMPLE,
};
