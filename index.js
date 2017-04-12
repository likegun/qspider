'use strict';
require('app-module-path').addPath(__dirname);
const debug = require('debug')('debug');

const config = require('src/common/get-config');
const role = require('src/common/get-role');
const CONST = require('src/const');

//初始化工作
require(`src/boot/${role}`)();

if(CONST.ROLES.slice(0, 2).includes(role)) {
  const app = require('src/app');
  const server = app.listen(role === CONST.DEFAULT_ROLE? (config.worker_port || CONST.DEFAULT_WORKER_PORT) : (config.master_port || CONST.DEFAULT_MASTER_PORT), () => {
    debug(`Server start!Listen on port ${server.address().port}`);
  });
}
