/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');

const camelCase = require('camelcase');

// Based on how SVGR generates a component name:
// https://github.com/gregberge/svgr/blob/main/packages/core/src/state.ts

const VALID_CHAR_REGEX = /[^a-zA-Z0-9_-]/g;

/**
 * @param {string} filePath
 * @returns {string}
 */
function getComponentName(filePath) {
  if (!filePath) return 'SvgComponent';
  const name = path.parse(filePath).name.replace(VALID_CHAR_REGEX, '');
  const pascalCaseFileName = camelCase(name, { pascalCase: true });
  return `Svg${pascalCaseFileName}`;
}

const transformer = {
  /**
   * @param {string} src
   * @param {string} filename
   */
  process(src, filename) {
    const assetFilename = JSON.stringify(path.basename(filename));
    const componentName = getComponentName(filename);

    return {
      code: `const React = require('react');
      module.exports = {
        __esModule: true,
        default: React.forwardRef(function ${componentName}(props, ref) {
          return {
            $$typeof: Symbol.for('react.element'),
            type: 'svg',
            ref: ref,
            key: null,
            props: Object.assign({}, props, {
              children: ${assetFilename}
            })
          };
        }),
      };`,
    };
  },
};

module.exports = transformer;
