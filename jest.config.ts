import type { Config } from 'jest';
import { pathsToModuleNameMapper } from 'ts-jest';

import { compilerOptions } from './tsconfig.json';

const styleExt = '(css|sass|scss)';
const styleRegExp = `\\.${styleExt}$`;
const styleModuleRegExp = `\\.module${styleRegExp}`;
const mediaFileRegExp =
  '\\.(jpg|jpeg|png|gif|eot|otf|webp|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$';
const svgRegExp = '\\.svg$';
const scriptRegExp = '\\.(js|jsx|mjs|cjs|ts|tsx)$';

const SRC_DIR = '<rootDir>/src';
const TEST_DIR = `${SRC_DIR}/__test__`;
const MOCK_DIR = `${TEST_DIR}/__mocks__`;

export default (): Promise<Config> => {
  return Promise.resolve({
    testEnvironment: 'jsdom',
    setupFilesAfterEnv: [`${TEST_DIR}/setupTests.js`],

    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
    moduleDirectories: ['node_modules'],

    moduleNameMapper: {
      [styleModuleRegExp]: 'identity-obj-proxy',
      ...pathsToModuleNameMapper(compilerOptions.paths, {
        prefix: SRC_DIR,
      }),
    },

    transform: {
      [scriptRegExp]: 'babel-jest',
      [styleRegExp]: `${MOCK_DIR}/cssTransform.js`,
      [svgRegExp]: `${MOCK_DIR}/svgTransform.js`,
      [mediaFileRegExp]: `${MOCK_DIR}/fileTransform.js`,
    },

    transformIgnorePatterns: [
      `[/\\\\]node_modules[/\\\\].+${scriptRegExp}`,
      styleModuleRegExp,
    ],

    resetMocks: true,
  });
};
