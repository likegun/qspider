'use strict';
const CONST = require('src/const');

const env = process.env.NODE_ENV || CONST.DEFAULT_NODE_ENV;

module.exports = require(`config.${env}.js`);
