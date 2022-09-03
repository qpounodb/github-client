const { CracoAliasPlugin } = require('react-app-alias');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

module.exports = {
  webpack: {
    configure: (config) => {
      const { extensions: exts, plugins } = config.resolve;
      const extensions = [...exts, '.sass', '.scss'];
      const plugin = new TsconfigPathsPlugin({ extensions });
      config.resolve.plugins = [...(plugins || []), plugin];
      return config;
    },
  },
  plugins: [
    {
      plugin: CracoAliasPlugin,
      options: {},
    },
  ],
};
