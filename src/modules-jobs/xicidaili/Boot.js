'use strict';
const co = require('co');

const CONST = require('src/const');
const Job = require('src/modules-jobs/Job');
const Url = require('src/models/xicidaili/Url');
const Proxy = require('src/models/xicidaili/Proxy');

class Boot extends Job {
  constructor(registration) {
    super(registration);
  }

  start() {
    const self = this;

    return co(function *() {
      switch (self.registration.strategy) {
        case 'restart':
          yield [Url, Proxy].map(model => model.remove());
          break;
        default:
          yield [Url, Proxy].map(model => model.update({
            status: CONST.JOB_STATUS[1]
          }, {
            $set: {
              status: CONST.JOB_STATUS[0]
            }
          }, {
            multi: true
          }));
      }
    });
  }
}

module.exports = Boot;
