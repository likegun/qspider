'use strict';
const co = require('co');

const debug = require('debug')('debug');

const Registration = require('src/models/Registration');
const Heartbeat = require('src/models/Heartbeat');
const config = require('src/common/get-config');
const CONST = require('src/const');

let last_free_job_over = true;

setInterval(() => {
  if(!last_free_job_over)
    return;
  last_free_job_over = false;

  co(function*() {
    const heartbeats = yield Heartbeat.where({
      last_beat_timestamp: {
        $lt: Date.now() - 2 * (config.heartbeat_timeout || CONST.HEARTBEAT_TIMEOUT)
      }
    })
    .select('-_id identifying')
    .exec();

    const identifyingArr = heartbeats.map(e => e.identifying);

    yield Heartbeat.remove({
      identifying: {
        $in: identifyingArr
      }
    })
    .exec();
    debug(`Main clears heartbeats: ${identifyingArr}`);


    yield Registration.update({
      identifying: {
        $in: identifyingArr
      },
      status: {
        $in: CONST.JOB_STATUS.slice(0, 2)
      }
    }, {
      $set: {
        identifying: null,
        status: CONST.JOB_STATUS[0]
      }
    }, {
      multi: true
    });
    debug(`Main revoke job: ${identifyingArr}`);

    last_free_job_over = true;
  })
  .catch(err => {
    console.log(err);
    process.exit(1);
  });
}, config.free_job_interval || CONST.FREE_JOB_INTERVAL);
