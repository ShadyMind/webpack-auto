'use strict';

const loader = require('..');
const assert = require('assert').strict;

assert.strictEqual(loader(), 'Hello from loader');
console.info("loader tests passed");
