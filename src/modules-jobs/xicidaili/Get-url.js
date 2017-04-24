'use strict';
const co = require('co');
const { format } = require('util');

const Job = require('src/modules-jobs/Job');
const PROXY_CONST = require('src/const/xicidaili');
const PROXY_ERRORS_CONST = require('src/const/xicidaili/errors');
const { get } = require('src/libs/request');
const Url = require('src/models/xicidaili/Url');

class GetUrl extends Job {
  constructor(registration) {
    super(registration);
  }

  start() {
    return co(function *() {
      const { body } = yield get(PROXY_CONST.FIRST_PAGE_URL);
      const match = body.match(/nn\/.*nn\/(\d+).*?next_page/);

      if(match && parseInt(match[1]) > 0) {
        const totalPageCount = parseInt(match[1]);
        for(let i = 1; i <= totalPageCount; i++) {
          const url = format(PROXY_CONST.PAGE_URL_FORMAT, i);
          yield new Url({ url }).save();
        }
      }
      else {
        throw new Error(PROXY_ERRORS_CONST.CAN_NOT_GET_TOTAL_PAGE_COUNT);
      }
    });
  }
}

module.exports = GetUrl;
