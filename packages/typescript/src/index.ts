import type { Middleware } from '@webpack-auto/types';
import forkTSChecker from 'fork-ts-checker-webpack-plugin';
import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin';

export const typescriptFeature: Middleware = (config) =>
  config
    .module
      .rule('typescript')
        .test(/\.tsx?$/)
        .use('typescript')
          .loader('ts-loader')
          .end()
        .end()
      .end()
    .resolve
      .plugin('tsconfig-paths')
        .use(TsconfigPathsPlugin)
        .end()
      .end()
    .plugin('ts-checker')
      .use(forkTSChecker, [{
        typescript: {
          mode: 'readonly'
        },
        issue: {},
        formatter: 'basic'
      }])
      .end();

export default typescriptFeature;
