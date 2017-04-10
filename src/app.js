'use strict';
const express = require('express');

const role = require('src/common/get-role');

const app = new express();

//加载相应角色的路由
require(`src/routers/${role}`)(app);

module.exports = app;
