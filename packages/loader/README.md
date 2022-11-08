# Webpack Auto: Loader

It loads webpack-auto extensions from `package.json` dependencies.

## Usage

file: `webpack.config.js`

```javascript
'use strict';

const { loader } = require('@webpack-auto/loader');

module.exports = loader().toConfig();
```
