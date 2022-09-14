import path from 'path';

import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import DotenvWebpackPlugin from 'dotenv-webpack';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { TsconfigPathsPlugin } from 'tsconfig-paths-webpack-plugin';
import Webpack from 'webpack';
import DevServer from 'webpack-dev-server';

const ROOT = path.resolve(__dirname);
const SRC = path.join(ROOT, 'src');
const DIST = path.join(ROOT, 'dist');
const PUBLIC = path.join(ROOT, 'public');

type Falsy = false | null | undefined | 0 | '';
type TruthyPredicate = <T>(x: T | Falsy) => x is T;

const styleExt = '(css|sass|scss)';

const extMap = {
  script: /\.(tsx?|jsx?)$/i,
  style: new RegExp(`\\.${styleExt}$`, 'i'),
  styleModule: new RegExp(`\\.module\\.${styleExt}$`, 'i'),
};

const assetExtMap = {
  font: /\.(woff2?|eot|ttf|otf)(\?.*)?$/i,
  image: /\.(ico|jpe?g|a?png|gif|webp)(\?.*)?$/i,
  media: /\.(mp4|webm|wav|mp3|m4a|aac|oga)(\?.*)?$/i,
};

export const getStylesLoaders = (
  isDev: boolean,
  withModules = false
): Webpack.RuleSetUseItem[] => {
  const injectLoader = isDev ? 'style-loader' : MiniCssExtractPlugin.loader;

  const localIdentName = isDev ? '[path][name]__[local]' : '[hash:base64]';

  const cssLoader = withModules
    ? {
        loader: 'css-loader',
        options: { modules: { localIdentName } },
      }
    : 'css-loader';

  const postcssLoader = {
    loader: 'postcss-loader',
    options: { postcssOptions: { plugins: ['autoprefixer'] } },
  };

  return [injectLoader, cssLoader, postcssLoader, 'sass-loader'];
};

const getConfig = (env: Record<string, string>): Webpack.Configuration => {
  const isDev = Boolean(env.WEBPACK_SERVE);
  const isProd = Boolean(env.WEBPACK_BUILD);
  const mode = isDev ? 'development' : 'production';
  process.env.NODE_ENV = mode;

  const extensions = ['.ts', '.tsx', '.js', '.jsx', '.css', '.scss', '.sass'];

  const devServer: DevServer.Configuration = {
    host: 'localhost',
    port: 7007,
    static: {
      directory: PUBLIC,
    },
    hot: true,
    open: true,
    historyApiFallback: true,
  };

  return {
    mode,
    devServer,

    entry: {
      index: path.join(SRC, 'index.tsx'),
    },

    output: {
      path: DIST,
      filename: 'static/script/bundle-[contenthash].js',
      publicPath: '/',
      clean: true,
    },

    optimization: {
      chunkIds: 'named',
      splitChunks: {
        chunks: 'all',
        cacheGroups: {
          vendors: {
            test: /[\\/]node_modules[\\/]/,
            priority: -10,
            reuseExistingChunk: true,
            filename: 'static/script/vendor/[name].min.js',
            name(
              module: Webpack.Module
              // chunks: Webpack.Chunk[],
              // cacheGroupKey: string
            ) {
              const moduleFileName = module
                .identifier()
                .replace(/.*node_modules\/([^/]*).*/, '$1');
              return moduleFileName;
            },
          },
        },
      },
    },

    target: 'browserslist',

    devtool: isDev ? 'eval-source-map' : 'hidden-source-map',

    module: {
      rules: [
        {
          test: extMap.script,
          exclude: /node_modules/,
          use: 'babel-loader',
        },
        {
          test: extMap.styleModule,
          use: getStylesLoaders(isDev, true),
        },
        {
          test: extMap.style,
          exclude: extMap.styleModule,
          use: getStylesLoaders(isDev, false),
          sideEffects: true,
        },
        {
          test: /\.svg$/,
          issuer: extMap.script,
          use: '@svgr/webpack',
        },
        ...Object.entries(assetExtMap).map(([type, ext]) => ({
          test: ext,
          type: 'asset',
          parser: { dataUrlCondition: { maxSize: 1024 } },
          generator: { filename: `static/${type}/[path][name][ext]` },
        })),
      ],
    },

    resolve: {
      extensions,
      plugins: [new TsconfigPathsPlugin({ extensions })],
    },

    plugins: [
      isProd &&
        new CopyWebpackPlugin({
          patterns: [{ from: PUBLIC, to: DIST }],
        }),
      new DotenvWebpackPlugin({
        path: './.env.local',
        systemvars: true,
      }),
      new HtmlWebpackPlugin({
        template: path.join(SRC, 'index.html'),
        inject: 'body',
      }),
      isProd &&
        new MiniCssExtractPlugin({
          filename: 'static/style/bundle-[fullhash].css',
        }),
      isDev && new ReactRefreshWebpackPlugin(),
      new ForkTsCheckerWebpackPlugin(),
    ].filter(Boolean as unknown as TruthyPredicate),
  };
};

export default getConfig;
