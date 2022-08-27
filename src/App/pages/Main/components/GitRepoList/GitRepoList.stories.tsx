import { ComponentMeta, ComponentStory } from '@storybook/react';
import info from '~/App/assets/data-examples/repo-info.json';

import { GitRepoList as GitRepoListComponent } from './GitRepoList';

type Meta = ComponentMeta<typeof GitRepoListComponent>;
type Story = ComponentStory<typeof GitRepoListComponent>;

const meta: Meta = {
  title: 'Main Page/GitRepoList',
  component: GitRepoListComponent,
};

export default meta;

const DATA_LIST_EXAMPLE = Array.from({ length: 5 }, (_, id) => ({
  ...info,
  id,
}));

export const GitRepoList: Story = (args) => (
  <GitRepoListComponent {...args} getCardClickHandler={() => () => {}} />
);
GitRepoList.args = { dataList: DATA_LIST_EXAMPLE };
