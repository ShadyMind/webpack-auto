import type { BasicMiddleware, WebpackAutoLoaderConfig, WebpackAutoLoaderOptions } from './types';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import Config from 'webpack-chain';
import { isObject, isModuleNameMatchPattern, isWebpackAutoMiddleware } from './guards';

const DEPENDENCIES_DEFAULT: WebpackAutoLoaderConfig['include'] = {
  regular: false,
  dev: true,
  optional: false,
  peer: false
};

export const normalizeConfig = (options: WebpackAutoLoaderOptions): WebpackAutoLoaderConfig => {
  return {
    include: { ...DEPENDENCIES_DEFAULT, ...options.include }
  };
};

export const readPackageJson = async (packageJsonLocation: string) => {
  return JSON.parse((await readFile(packageJsonLocation)).toString('utf-8'));
};

export const getModules = (
  packageJsonData: Record<string, unknown>,
  packageJsonDirectoryLocation: string,
  config: WebpackAutoLoaderConfig
): unknown[] => {
  const { dependencies, devDependencies, peerDependencies, optionalDependencies } = packageJsonData;
  const modules: string[] = [];
  const modulesMap: Record<string, string> = {};

  if (config.include.regular && isObject(dependencies)) {
    modules.push(...Object.keys(dependencies).filter(isModuleNameMatchPattern));
    Object.assign(modulesMap, dependencies);
  }
  
  if (config.include.dev && isObject(devDependencies)) {
    modules.push(...Object.keys(devDependencies).filter(isModuleNameMatchPattern));
    Object.assign(modulesMap, devDependencies);
  }
  
  if (config.include.peer && isObject(peerDependencies)) {
    modules.push(...Object.keys(peerDependencies).filter(isModuleNameMatchPattern));
    Object.assign(modulesMap, peerDependencies);
  }
  
  if (config.include.optional && isObject(optionalDependencies)) {
    modules.push(...Object.keys(optionalDependencies).filter(isModuleNameMatchPattern));
    Object.assign(modulesMap, optionalDependencies);
  }

  return modules.map((moduleName) => {
    const versionOrModulePath = modulesMap[moduleName]!;
    let modulePath: string;

    if (versionOrModulePath.startsWith('.')) {
      modulePath = path.resolve(packageJsonDirectoryLocation, versionOrModulePath);
    } else {
      /* istanbul ignore next */
      modulePath = moduleName;
    }
    
    return require(modulePath);
  });
};

export const validateMiddlewares = (modules: unknown[]): BasicMiddleware<Config>[] => {
  return modules.filter<BasicMiddleware<Config>>(isWebpackAutoMiddleware);
};
