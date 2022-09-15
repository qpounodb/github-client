import { ComponentMeta, ComponentStory } from '@storybook/react';

import data from '~assets/data-examples/repo-info.json';
import { normalizeRepoCollection } from '~models/github';

import GitRepoListComponent from './GitRepoList';

type Meta = ComponentMeta<typeof GitRepoListComponent>;
type Story = ComponentStory<typeof GitRepoListComponent>;

const meta: Meta = {
  title: 'Main Page/GitRepoList',
  component: GitRepoListComponent,
};

export default meta;

export const GitRepoList: Story = (args) => (
  <GitRepoListComponent {...args} getCardClickHandler={() => () => null} />
);

const list = Array.from({ length: 5 }, (_, id) => ({ ...data, id }));

GitRepoList.args = GitRepoList.args = {
  data: normalizeRepoCollection(list),
};
