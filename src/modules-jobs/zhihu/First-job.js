'use strict';
const co = require('co');

const CONST = require('src/const');
const User = require('src/models/zhihu/User');
const get = require('src/modules-request/zhihu/get');

class FirstJob {
  constructor() {
    this.over = false;
  }

  overOrNot() {
    return this.over;
  }

  start() {
    const self = this;

    return co(function *() {
      while(true) {
        console.log('what');
        const user = yield User.findOneAndUpdate({
          first_job_status: CONST.JOB_STATUS[0]
        }, {
          $set: {
            first_job_status: CONST.JOB_STATUS[1]
          }
        });

        console.log(user);

        if(!user)
          continue;

        const { body } = yield get(user.url);
        console.log('once');
      }
    })
    .catch(console.error);
  }
}

module.exports = FirstJob;
