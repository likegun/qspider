'use strict';
const co = require('co');
const child_process = require('child_process');

const debug = require('debug')('debug');

const Registration = require('src/models/Registration');
const config = require('src/common/get-config');
const identifying = require('src/common/get-identifying');
const CONST = require('src/const');


const child_processes = [];
let last_start_job_over = true;

process.on('exit', () => {
  child_processes.forEach(e => e.kill());
});

setInterval(() => {
  if(!last_start_job_over)
    return;
  last_start_job_over = false;

  co(function *() {
    const registrations = yield Registration.find({
      identifying,
      status: CONST.JOB_STATUS[0]
    })
    .exec();


    for(const registration of registrations) {
      const Job = require(registration.job_file);
      const job = new Job(registration);
      
      if(job.canStart && ! ( yield job.canStart() ))
        continue;

      const forked_child_process = child_process.fork('index.js', [], {
        env: {
          registration: JSON.stringify(registration),
          role: CONST.ROLES[2]
        }
      });

      debug(`${identifying} start job: ${registration._id}`);

      child_processes.push(forked_child_process);
      forked_child_process.on('exit', function(code) {
        const index = child_processes.findIndex(e => e === forked_child_process);
        if(index !== -1) {
          child_processes[index] = {
            kill: () => {}
          };
        }

        co(function *() {
          if(code === 0) {
            yield Registration.update({
              _id: registration._id,
              status: CONST.JOB_STATUS[1]
            }, {
              $set: {
                status: CONST.JOB_STATUS[2]
              }
            })
            .exec();
            debug(`${identifying} finish job: ${registration._id}`);
          }
          else {
            yield Registration.update({
              _id: registration._id,
              status: CONST.JOB_STATUS[1]
            }, {
              $set: {
                status: CONST.JOB_STATUS[0]
              }
            })
            .exec();
            debug(`${identifying} revoke job: ${registration._id}`);
          }
        })
        .catch(err => {
          console.log(err);
        });
      });
      yield Registration.update({
        _id: registration._id
      }, {
        $set: {
          status: CONST.JOB_STATUS[1]
        }
      });
    }

    last_start_job_over = true;
  })
  .catch(err => {
    console.log(err);
    process.exit(1);
  });
}, config.get_job_interval || CONST.GET_JOB_INTERVAL);
