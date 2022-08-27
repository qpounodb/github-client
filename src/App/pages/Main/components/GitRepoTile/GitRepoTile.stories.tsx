import { ComponentMeta, ComponentStory } from '@storybook/react';
import info from '~/App/assets/data-examples/repo-info.json';

import { GitRepoTile as GitRepoTileComponent } from './GitRepoTile';

type Meta = ComponentMeta<typeof GitRepoTileComponent>;
type Story = ComponentStory<typeof GitRepoTileComponent>;

const meta: Meta = {
  title: 'Main Page/Git-Repo-Tile',
  component: GitRepoTileComponent,
};

export default meta;

export const GitRepoTile: Story = (args) => <GitRepoTileComponent {...args} />;
GitRepoTile.args = {
  apiData: info,
};
