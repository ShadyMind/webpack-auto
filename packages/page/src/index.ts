import type { Middleware } from '@webpack-auto/types';
import type { MetaOptions } from './types';
import path from 'node:path';
import HtmlWebpackPlugin from 'html-webpack-plugin';

export type PageFeatureOptions = {
  meta?: MetaOptions;
  locale?: string;
} | undefined;

declare global {
  var pageFeatureOptions: PageFeatureOptions;
}

export const pageFeature: Middleware = (config, pack) => {
  const meta: MetaOptions = {
    viewport: 'width=device-width,initial-scale=1,shrink-to-fit=no'
  };

  const options: HtmlWebpackPlugin.Options & { data: Record<string, unknown> } = {
    scriptLoading: 'defer',
    cache: true,
    minify: 'auto',
    template: path.resolve(__dirname, 'index.html'),
    data: {}
  };

  if (typeof pack.name === 'string') {
    options.title = pack.name;
  }

  if (typeof pack.description === 'string') {
    meta.description = pack.description;
  }

  if (typeof pageFeatureOptions !== 'undefined') {
    if ('meta' in pageFeatureOptions) {
      options.meta = Object.assign(meta, pageFeatureOptions.meta);
    }

    if ('locale' in pageFeatureOptions) {
      options.data['locale'] = pageFeatureOptions.locale;
    }
  }

  return config
    .plugin('html').use(HtmlWebpackPlugin, [options])
    .end()
};

export default pageFeature;
