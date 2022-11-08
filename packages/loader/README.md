# Webpack Auto: Loader

It loads webpack-auto extensions from `package.json` dependencies.

## Usage

file: `webpack.config.js`

```javascript
'use strict';

const { loader } = require('@webpack-auto/loader');

const pageFeatureOptions = {
  meta: {
    description: 'Some fancy description for your application'
  }
};

module.exports = loader().toConfig();
```
