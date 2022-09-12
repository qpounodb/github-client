import path from 'path';

import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';
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

const notFalse = <T>(x: false | T): x is T => Boolean(x);

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
      directory: './public',
    },
    hot: true,
    open: true,
  };

  return {
    mode,
    devServer,

    entry: {
      index: path.join(SRC, 'index.tsx'),
    },

    output: {
      path: DIST,
      filename: 'bundle-[contenthash].js',
    },

    target: 'browserslist',

    devtool: isDev ? 'eval-source-map' : 'hidden-source-map',

    module: {
      rules: [
        {
          test: /\.[tj]sx?$/i,
          exclude: /node_modules/,
          use: 'babel-loader',
        },
        {
          test: /\.module\.s?css$/i,
          use: getStylesLoaders(isDev, true),
        },
        {
          test: /\.s?css$/i,
          exclude: /\.module\.s?css$/i,
          use: getStylesLoaders(isDev, false),
          sideEffects: true,
        },
        {
          test: /\.svg$/,
          issuer: /\.[tj]sx?$/i,
          use: '@svgr/webpack',
        },
        {
          test: /\.(ico|jpe?g|a?png|gif|eot|otf|webp|ttf|woff2?|cur|ani|pdf)(\?.*)?$/,
          type: 'asset/resource',
          generator: { filename: 'static/media/[path][name][ext]' },
        },
        {
          test: /\.(mp4|webm|wav|mp3|m4a|aac|oga)(\?.*)?$/,
          type: 'asset/resource',
          generator: { filename: 'static/media/[path][name][ext]' },
        },
      ],
    },

    resolve: {
      extensions,
      plugins: [new TsconfigPathsPlugin({ extensions })],
    },

    plugins: [
      new DotenvWebpackPlugin({
        path: './.env.local',
      }),
      new HtmlWebpackPlugin({
        template: path.join(PUBLIC, 'index.html'),
        inject: 'body',
      }),
      isProd &&
        new MiniCssExtractPlugin({
          filename: 'bundle-[hash].css',
        }),
      isDev && new ReactRefreshWebpackPlugin(),
      new ForkTsCheckerWebpackPlugin(),
    ].filter(notFalse),
  };
};

export default getConfig;
