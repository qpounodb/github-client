import { ComponentMeta, ComponentStory } from '@storybook/react';
import data from '~/App/assets/data-examples/repo-languages.json';
import { normalizeRepoLangs } from '~/App/models/github';
import RepoLangsComponent from './RepoLangs';

type Meta = ComponentMeta<typeof RepoLangsComponent>;
type Story = ComponentStory<typeof RepoLangsComponent>;

const meta: Meta = {
  title: 'Repo Page/RepoLangs',
  component: RepoLangsComponent,
};

export default meta;

export const RepoLangs: Story = (args) => <RepoLangsComponent {...args} />;
RepoLangs.args = { state: { data: normalizeRepoLangs(data) } };
