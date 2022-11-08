import Config from 'webpack-chain';
import {
  isObject,
  isModuleNameMatchPattern,
  isWebpackAutoMiddleware
} from '../src/guards';


describe('Typeguards', () => {
  describe('"isObject" utility', () => {
    
    test('Should decline primitives', () => {
      const samples = [true, false, 1, 0, '1', '', Symbol('1')];

      samples.forEach((primitive) => {
        expect(isObject(primitive)).not.toBeTruthy();
      });
    });

    test('Should decline "null" value', () => {
      expect(isObject(null)).not.toBeTruthy();
    });

    test('Should decline any of array', () => {
      const samples = [[], ['1']];

      samples.forEach((array) => {
        expect(isObject(array)).not.toBeTruthy();
      });
    });

    test('Should accept empty object', () => {
      expect(isObject({})).toBeTruthy();
    });

    test('Should accept filled object', () => {
      expect(isObject({ a: 1 })).toBeTruthy();
    });

    test('Should accept any constructed object', () => {
      class Subject {}
      expect(isObject(new Subject)).toBeTruthy();
    });
  });

  describe('"isModuleNameMatchPattern" utility', () => {
    test('Should decline incorrect types of value', () => {
      expect(isModuleNameMatchPattern(false)).toBeFalsy();
      expect(isModuleNameMatchPattern(1)).toBeFalsy();
      expect(isModuleNameMatchPattern(Symbol('a'))).toBeFalsy();
      expect(isModuleNameMatchPattern({})).toBeFalsy();
      expect(isModuleNameMatchPattern([])).toBeFalsy();
    });

    test('Should decline incorrect strings', () => {
      expect(isModuleNameMatchPattern('webpack-auto-')).toBeFalsy();
      expect(isModuleNameMatchPattern('pack-auto-test')).toBeFalsy();
      expect(isModuleNameMatchPattern('webpack-test')).toBeFalsy();
      expect(isModuleNameMatchPattern('test-webpack-auto')).toBeFalsy();
      expect(isModuleNameMatchPattern('webpack-auto-A')).toBeFalsy();
      expect(isModuleNameMatchPattern('')).toBeFalsy();
    });

    test('Should accept correct strings', () => {
      expect(isModuleNameMatchPattern('./test.js')).toBeTruthy();
      expect(isModuleNameMatchPattern('webpack-auto-test')).toBeTruthy();
      expect(isModuleNameMatchPattern('webpack-auto-test-auto')).toBeTruthy();
    });
  });

  describe('"isWebpackAutoMiddleware" utility', () => {
    test('Should decline non-function values', () => {
      expect(() => isWebpackAutoMiddleware(false)).toThrow();
      expect(() => isWebpackAutoMiddleware({})).toThrow();
      expect(() => isWebpackAutoMiddleware([])).toThrow();
      expect(() => isWebpackAutoMiddleware(1)).toThrow();
      expect(() => isWebpackAutoMiddleware('1')).toThrow();
    });

    test('Should decline functions those didn\'t return Config instance', () => {
      const sample = (config: Config) => {
        config
          .entry('index.js')
          .end();
  
        return false;
      }

      expect(isWebpackAutoMiddleware(sample)).toBeFalsy();
    });

    test('Should set configuration values', () => {
      const sample = (config: Config) =>
        config
          .entry('index.js')
          .end();

      expect(isWebpackAutoMiddleware(sample)).toBeTruthy();
    });
  });
});
