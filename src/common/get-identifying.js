'use strict';
const os = require('os');

module.exports = os.hostname() + parseInt(Math.random() * 9999999999999999);
