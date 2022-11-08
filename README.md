# Webpack Auto

this project aimed to simplify webpack configuration

# Usage

```sh
$ npm i -D @webpack-auto/page @webpack-auto/loader
```

file: `webpack.config.js`

```javascript
'use strict';

const { loader } = require('@webpack-auto/loader');

/* @type import('@webpack-auto').PageFeatureOptions */
const pageFeatureOptions = {
  meta: {
    description: 'Some fancy description for your application'
  }
};

module.exports = loader().toConfig();
```

It loads webpack-auto features from `package.json` dependencies.
