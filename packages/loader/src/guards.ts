import { BasicMiddleware } from "@webpack-auto/types";
import Config from 'webpack-chain';

export const isObject = (input: unknown): input is Record<string, unknown> => {
  return typeof input === 'object' && input !== null && !Array.isArray(input);
};

const MODULE_NAME_PATTERN_RE = /^webpack-auto(-[0-9a-z-]+)+$/;

export const isModuleNameMatchPattern = (name: unknown): boolean => {
  if (typeof name === 'string') {
    if (name.startsWith('./') || name.startsWith('.js')) {
      return true;
    }

    return MODULE_NAME_PATTERN_RE.test(name);
  }

  return false;
};

export const isWebpackAutoMiddleware = (input: unknown): input is BasicMiddleware<Config> => {
  if (typeof input !== 'function') {
    throw new TypeError('Middleware');
  }

  return input(new Config()) instanceof Config;
};
