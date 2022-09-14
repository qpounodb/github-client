//@ts-check

/**
 * @typedef {false | null | undefined | 0 | ''} Falsy
 * @typedef {<T>(x: Falsy | T) => x is T} TruthyPredicate
 */

/** @type {import('@babel/core').ConfigFunction} */
const getConfig = (api) => {
  const isDev = process.env.NODE_ENV === 'development';

  api.cache.using(() => process.env.NODE_ENV);

  /** @type {import('@babel/core').TransformOptions['presets']} */
  const presets = [
    ['@babel/preset-env'],
    ['@babel/preset-react', { runtime: 'automatic' }],
    '@babel/preset-typescript',
  ];

  /** @type {import('@babel/core').TransformOptions['plugins']} */
  const plugins = [
    '@babel/plugin-proposal-class-properties',
    isDev && 'react-refresh/babel',
  ].filter(/** @type {TruthyPredicate} */ (/** @type {unknown} */ (Boolean)));

  return {
    presets,
    plugins,
  };
};

module.exports = getConfig;
