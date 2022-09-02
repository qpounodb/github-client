import { PluginItem } from '@craco/craco';
import { CracoAliasPlugin } from 'react-app-alias';

export const plugins: Array<PluginItem<any>> = [
  {
    plugin: CracoAliasPlugin,
    options: {},
  },
];
