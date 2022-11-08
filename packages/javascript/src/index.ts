import type { Middleware } from '@webpack-auto/types';

const javascriptFeature: Middleware = (config) =>
  config
    .resolve
      .extensions
      .add('.js')
      .end()
    .end()
    .module
      .rule('babel')
        .test(/\.js$/)
        .use('babel')
        .loader('babel-loader')
          .options({ presets: ["@babel/preset-env"] })
        .end()
      .end()
    .end()
;

export default javascriptFeature;
