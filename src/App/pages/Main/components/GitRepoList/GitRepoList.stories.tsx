import { ComponentMeta, ComponentStory } from '@storybook/react';
import { API_DATA_EXAMPLE } from '../GitRepoTile/GitRepoTile.stories';

import { GitRepoList as GitRepoListComponent } from './GitRepoList';

type Meta = ComponentMeta<typeof GitRepoListComponent>;
type Story = ComponentStory<typeof GitRepoListComponent>;

const meta: Meta = {
  title: 'Main Page/GitRepoList',
  component: GitRepoListComponent,
};

export default meta;

const DATA_LIST_EXAMPLE = Array.from({ length: 5 }, (_, id) => ({
  ...API_DATA_EXAMPLE,
  id,
}));

export const GitRepoList: Story = (args) => <GitRepoListComponent {...args} />;
GitRepoList.args = { dataList: DATA_LIST_EXAMPLE };
