/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');

module.exports = {
  /**
   * @param {string} src
   * @param {string} filename
   */
  process(src, filename) {
    const assetFilename = JSON.stringify(path.basename(filename));

    return `module.exports = ${assetFilename};`;
  },
};
