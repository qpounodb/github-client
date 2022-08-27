import { ComponentMeta, ComponentStory } from '@storybook/react';
import data from '~/App/assets/data-examples/repo-languages.json';
import { RepoLangs as RepoLangsComponent } from './RepoLangs';

type Meta = ComponentMeta<typeof RepoLangsComponent>;
type Story = ComponentStory<typeof RepoLangsComponent>;

const meta: Meta = {
  title: 'Repo Page/RepoLangs',
  component: RepoLangsComponent,
};

export default meta;

export const RepoLangs: Story = (args) => <RepoLangsComponent {...args} />;
RepoLangs.args = { data };
