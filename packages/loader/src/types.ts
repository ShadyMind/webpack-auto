export type DependencyTypes = 'regular' | 'dev' | 'optional' | 'peer';

export interface WebpackAutoLoaderConfig {
  include: Record<DependencyTypes, boolean>;
  // overrideEntries: Record<string, EntryType>;
}

export interface WebpackAutoLoaderOptions {
  include?: Partial<Record<DependencyTypes, boolean>> | false;
}
