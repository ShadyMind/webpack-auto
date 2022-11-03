
import type { WebpackAutoLoaderConfig } from './types';
import path from 'node:path';
import Config from 'webpack-chain';
import { readPackageJson, getModules, validateMiddlewares, normalizeConfig } from './utils';

export const webpackAuto = async (
    packageJSONLocation: string = path.join(process.cwd(), 'package.json'),
    options: Partial<WebpackAutoLoaderConfig>
) => {
    const config = normalizeConfig(options);
    const packageJsonData = await readPackageJson(packageJSONLocation);
    const moduleNames = getModules(packageJsonData, config);
    const middlewares = validateMiddlewares(moduleNames);
    return middlewares.reduce((acc, middleware) => middleware(acc), new Config());
};