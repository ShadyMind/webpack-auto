import type { BasicMiddleware, WebpackAutoLoaderConfig } from './types';
import { readFile } from 'node:fs/promises';
import Config from 'webpack-chain';
import { isObject, isModuleNameMatchPattern, isWebpackAutoMiddleware } from './guards';

const DEPENDENCIES_DEFAULT: WebpackAutoLoaderConfig['include'] = {
    regular: false,
    dev: true,
    optional: false,
    peer: false
};

export const normalizeConfig = (options: Partial<WebpackAutoLoaderConfig>): WebpackAutoLoaderConfig => {
    return {
        include: { ...DEPENDENCIES_DEFAULT, ...options.include }
    }
};

export const readPackageJson = async (packageJsonLocation: string) => {
    return JSON.parse((await readFile(packageJsonLocation)).toString('utf-8'));
};

export const getModules = (
    packageJsonData: Record<string, unknown>,
    config: WebpackAutoLoaderConfig
): unknown[] => {
    const { dependencies, devDependencies, peerDependencies, optionalDependencies } = packageJsonData;
    let modules: string[] = [];

    if (config.include.regular && isObject(dependencies)) {
        modules.push(...Object.keys(dependencies).filter(isModuleNameMatchPattern));
    }
    
    if (config.include.dev && isObject(devDependencies)) {
        modules.push(...Object.keys(devDependencies).filter(isModuleNameMatchPattern));
    }

    if (config.include.peer && isObject(peerDependencies)) {
        modules.push(...Object.keys(peerDependencies).filter(isModuleNameMatchPattern));
    }

    if (config.include.optional && isObject(optionalDependencies)) {
        modules.push(...Object.keys(optionalDependencies).filter(isModuleNameMatchPattern));
    }

    return modules.map(require);
};

export const validateMiddlewares = (modules: unknown[]): BasicMiddleware<Config>[] => {
    return modules.filter<BasicMiddleware<Config>>(isWebpackAutoMiddleware);
};