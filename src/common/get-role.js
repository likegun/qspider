'use strict';
const CONST = require('src/const');
const ERRORS = require('src/const/errors');

const role = process.env.role || CONST.DEFAULT_ROLE;

if(!CONST.ROLES.includes(role)) {
  throw new Error(ERRORS.UNSUPPORT_ROLE(role));
}

module.exports = role;
