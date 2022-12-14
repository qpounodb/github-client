import type { ConfigOptions } from 'typed-scss-modules/dist/lib/core/types';

export const config: Partial<ConfigOptions> = {
  aliasPrefixes: {
    '~/': 'src/',
    '~styles/': 'src/App/styles/',
  },
  updateStaleOnly: true,
  logLevel: 'verbose',
  nameFormat: ['none'],
  exportType: 'default',
};
