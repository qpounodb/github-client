//@ts-check

/** @type {<T>(x: false | T) => x is T} */
const notFalse = (x) => Boolean(x);

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
  ].filter(notFalse);

  return {
    presets,
    plugins,
  };
};

module.exports = getConfig;
