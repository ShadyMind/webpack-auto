import type { Get } from 'type-fest';
import Config from 'webpack-chain';


type EntryType = keyof Config | 'root';
type Entry<Type extends EntryType> = Type extends 'root' ? Config : Get<Config, Type>;

export interface BasicMiddleware<
  TOutput extends Entry<EntryType>,
  TInput extends Get<Config, string> = TOutput | Promise<TOutput>
> {
  (config: TInput): TOutput;
}

export type MiddlewareIn<Type extends EntryType> = BasicMiddleware<Entry<Type>>;

export type DependencyTypes = 'regular' | 'dev' | 'optional' | 'peer';

export interface WebpackAutoLoaderConfig {
  include: Record<DependencyTypes, boolean>;
  // overrideEntries: Record<string, EntryType>;
}