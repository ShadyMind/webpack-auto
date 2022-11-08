import type { Middleware } from '@webpack-auto/types';

export const typescriptFeature: Middleware = (config) =>
  config
    .module
      .rule('typescript')
        .test(/\.ts$/)
        .use('typescript')
          .loader('ts-loader')
          .end()
        .end()
      .end()
    .resolve
      .plugin('tsconfig-paths')
        .use('tsconfig-paths-webpack-plugin')
        .end()
      .end()
    .plugin('ts-checker')
      .use('fork-ts-checker-webpack-plugin', [{
        typescript: {
          mode: 'readonly'
        },
        issue: {},
        formatter: 'basic'
      }])
      .end();

export default typescriptFeature;
