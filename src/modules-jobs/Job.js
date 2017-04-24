'use strict';
const co = require('co');
const ObjectId = require('mongoose').Types.ObjectId;
const debug = require('debug')('debug');

const CONST = require('src/const');
const Registration = require('src/models/Registration');

class Job {
  constructor(registration) {
    this.registration = registration;
    this.run = true;
  }

  canStart() {
    const self = this;

    if(self.registration.beforeJobs.length === 0)
      return Promise.resolve(true);

    return co(function *() {
      const beforeCrawledJobCount = yield Registration.count({
        job_file: {
          $in: self.registration.beforeJobs
        },
        status: CONST.JOB_STATUS[2]
      }).exec();

      return Promise.resolve(beforeCrawledJobCount === self.registration.beforeJobs.length);
    });
  }

  checkOverOrNot() {
    const self = this;

    if(self.registration.relyJobs.length === 0)
      return self.run = false;

    return co(function *() {
      const relyCrawledJobCount = yield Registration.count({
        task_id: ObjectId(self.registration.task_id),
        job_file: {
          $in: self.registration.relyJobs
        },
        status: CONST.JOB_STATUS[2]
      }).exec();

      debug(`relyCrawledJobCount: ${relyCrawledJobCount}`);

      self.run = relyCrawledJobCount !== self.registration.relyJobs.length;
    });
  }
}

module.exports = Job;
