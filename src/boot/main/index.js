'use strict';
const { basename, extname } = require('path');

const { readdir } = require('src/libs/filesystem.js');

module.exports = function() {
  readdir('./src/boot/main')
        .filter(file => extname(file) === '.js' && basename(file) !== 'index.js')
        .forEach(file => require(file));
};
