import { ComponentMeta, ComponentStory } from '@storybook/react';
import data from '~/App/assets/data-examples/repo-commit.json';
import { normalizeCommit } from '~/App/models/GitHub';
import { getDataState } from '~/shared/utils';
import RepoCommitComponent from './RepoCommit';

type Meta = ComponentMeta<typeof RepoCommitComponent>;
type Story = ComponentStory<typeof RepoCommitComponent>;

const meta: Meta = {
  title: 'Repo Page/RepoCommit',
  component: RepoCommitComponent,
};

export default meta;

export const RepoCommit: Story = (args) => <RepoCommitComponent {...args} />;
RepoCommit.args = { state: getDataState(normalizeCommit(data)) };
