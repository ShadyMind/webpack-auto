
import type { WebpackAutoLoaderConfig } from './types';
import path from 'node:path';
import Config from 'webpack-chain';
import { readPackageJson, getModules, validateMiddlewares, normalizeConfig } from './utils';

export type { WebpackAutoLoaderConfig };

export const webpackAuto = async (
    packageJSONLocation: string = path.join(process.cwd(), 'package.json'),
    options: Partial<WebpackAutoLoaderConfig>
) => {
    const config = normalizeConfig(options);
    const packageJsonData = await readPackageJson(packageJSONLocation);
    const modules = getModules(
      packageJsonData,
      path.dirname(packageJSONLocation),
      config
    );
    const middlewares = validateMiddlewares(modules);
    
    let i = 0;
    let len = middlewares.length;
    const cursor = Promise.resolve(new Config());

    while (i < len) {
      const middleware = middlewares[i];

      cursor.then((config) => {
        const result = middleware!(config);

        if (result instanceof Promise) {
          return result;
        } else {
          return Promise.resolve(result);
        }
      });

      i++;
    }

    return cursor;
};
