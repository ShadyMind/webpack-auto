import type { BasicMiddleware } from "./types";
import Config from 'webpack-chain';

export const isObject = (input: unknown): input is Record<string, unknown> => {
    return typeof input === 'object' && input !== null && !Array.isArray(input);
};

const MODULE_NAME_PATTERN_RE = /^webpack-auto-.+$/g;

export const isModuleNameMatchPattern = (name: string): boolean => {
    return MODULE_NAME_PATTERN_RE.test(name);
};

export const isWebpackAutoMiddleware = (input: unknown): input is BasicMiddleware<Config> => {
    return typeof input === 'function' && input(new Config()) instanceof Config;
};