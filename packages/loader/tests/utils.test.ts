import path from 'path';
import { get } from 'lodash';
import { isObject } from '../src/guards';
import { getModules, normalizeConfig, readPackageJson, validateMiddlewares } from '../src/utils';
import { WebpackAutoLoaderOptions } from '../src/types';
import Config from 'webpack-chain';

describe('Utils', () => {
  describe('"normalizeConfig" utility', () => {
    test('Should return object', () => {
      expect(isObject(normalizeConfig({}))).toBeTruthy();
    });

    test('Should return object', () => {
      expect(isObject(normalizeConfig({}))).toBeTruthy();
    });

    test('Should have all required fields', () => {
      const config = normalizeConfig({});
      expect(isObject(get(config, 'include'))).toBeTruthy();
      expect(typeof isObject(get(config, 'include.regular'))).toStrictEqual('boolean');
      expect(typeof isObject(get(config, 'include.dev'))).toStrictEqual('boolean');
      expect(typeof isObject(get(config, 'include.optional'))).toStrictEqual('boolean');
      expect(typeof isObject(get(config, 'include.peer'))).toStrictEqual('boolean');
    });
  });

  describe('"readPackageJson" utility', () => {
    test('Should throw error on absent file', async () => {
      try {
        await readPackageJson('bla.json');
      } catch (ex) {
        const errno = ex as NodeJS.ErrnoException;
        expect(errno.errno).toBe(-2);
        expect(errno.code).toBe('ENOENT');
      }
    });

    test('Should return content', async () => {
      await expect(readPackageJson(path.join(__dirname, 'mocks', 'package.json')))
        .resolves.toStrictEqual({
          dependencies: {
            foo: './modules/foo.js'
          },
          devDependencies: {
            bar: './modules/bar.js'
          },
          peerDependencies: {
            baz: './modules/baz.js'
          },
          optionalDependencies: {
            pez: './modules/pez.js'
          }
        });
    });
  });

  describe('"getModules" utility', () => {
    const options: WebpackAutoLoaderOptions = {
      include: {
        regular: true,
        dev: true,
        peer: true,
        optional: true
      }
    };

    const packageData = {
      dependencies: {
        'webpack-auto-foo': './mocks/modules/foo.js'
      },
      devDependencies: {
        'webpack-auto-bar': './mocks/modules/bar.js'
      },
      peerDependencies: {
        'webpack-auto-baz': './mocks/modules/baz.js'
      },
      optionalDependencies: {
        'webpack-auto-pez': './mocks/modules/pez.js'
      }
    }

    test('Should return empty array, if package json didn\'t provide specific fields', () => {
      expect(getModules({}, __dirname, normalizeConfig(options))).toStrictEqual([]);
    });

    test('Should return empty array, if package json didn\'t provide specific fields', () => {
      expect(getModules(packageData, __dirname, normalizeConfig(options))).toStrictEqual([
        require('./mocks/modules/foo'),
        require('./mocks/modules/bar'),
        require('./mocks/modules/baz'),
        require('./mocks/modules/pez')
      ]);
    });
  });

  describe('"validateMiddlewares" utility', () => {
    test('Should accept functions that returns webpack-chain config', () => {
      const sample = [
        () => new Config(),
        (config: Config) => config,
        (config: Config) => config.entry('test').end()
      ];
      expect(validateMiddlewares(sample).length).toBe(3);
    });

    test('Should decline functions that didn\'t return webpack-chain config', () => {
      const sample = [() => null, () => ({})];

      expect(validateMiddlewares(sample).length).toBe(0);
    })
  });
});
