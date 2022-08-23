const { join, resolve } = require('path');

module.exports = {
  webpack: {
    alias: {
      '~': join(resolve(__dirname, 'src')),
    },
  },
};
