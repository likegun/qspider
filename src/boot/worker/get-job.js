'use strict';
const co = require('co');
const os = require('os');

const debug = require('debug')('debug');
const debug_error = require('debug')('error');

const Registration = require('src/models/Registration');
const config = require('src/common/get-config');
const identifying = require('src/common/get-identifying');
const CONST = require('src/const');

const available_cpu_count = os.cpus().length - 1;
let last_get_job_over = true;

setInterval(() => {
  if(!last_get_job_over)
    return;
  last_get_job_over = false;

  co(function *() {
    const count = yield Registration.count({
      identifying,
      status: {
        $in: CONST.JOB_STATUS.slice(0, 2)
      }
    })
    .exec();

    if(count >= available_cpu_count) {
      last_get_job_over = true;
      return;
    }

    for(let i = 0; i < available_cpu_count - count; i++) {
      const ret = yield Registration.findOneAndUpdate({
        identifying: null
      }, {
        identifying
      }, {
        sort: {
          task_priority: 1,
          job_priority: 1
        }
      });

      if(ret === null)
        break;

      debug(`${identifying} get job: ${ret._id}`);
    }

    last_get_job_over = true;
  })
  .catch(err => {
    console.log(err);
    process.exit(1);
  });
}, config.get_job_interval || CONST.GET_JOB_INTERVAL);
