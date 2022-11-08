import type { Get } from 'type-fest';
import type { CoreProperties } from '@schemastore/package';
import type Config from 'webpack-chain';

type EntryType = keyof Config | 'root';
type Entry<Type extends EntryType> = Type extends 'root' ? Config : Get<Config, Type>;

export interface BasicMiddleware<
  TOutput extends Entry<EntryType>,
  TInput extends Get<Config, string> = TOutput
> {
  (config: TInput, packageJsonData: CoreProperties): TOutput | Promise<TOutput>;
}

export type Middleware<Type extends EntryType = 'root'> = BasicMiddleware<Entry<Type>>;
