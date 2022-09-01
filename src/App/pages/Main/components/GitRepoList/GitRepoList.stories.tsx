import { ComponentMeta, ComponentStory } from '@storybook/react';
import data from '~/App/assets/data-examples/repo-info.json';
import { normalizeRepoCollection } from '~/App/models/GitHub';
import { getDataState } from '~/shared/utils';

import { GitRepoList as GitRepoListComponent } from './GitRepoList';

type Meta = ComponentMeta<typeof GitRepoListComponent>;
type Story = ComponentStory<typeof GitRepoListComponent>;

const meta: Meta = {
  title: 'Main Page/GitRepoList',
  component: GitRepoListComponent,
};

export default meta;

export const GitRepoList: Story = (args) => (
  <GitRepoListComponent {...args} getCardClickHandler={() => () => {}} />
);

const list = Array.from({ length: 5 }, (_, id) => ({ ...data, id }));

GitRepoList.args = GitRepoList.args = {
  state: getDataState(normalizeRepoCollection(list)),
};
