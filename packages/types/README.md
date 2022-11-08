# Webpack Auto: Types

Public types for webpack auto features.

## Usage

file `custom.autofeature.js`
```typescript
import type { Middleware } from '@webpack-auto/types';

const customFeature: Middleware = (config) => {
  // api access here

  return config;
};

export default customFeature;
```
