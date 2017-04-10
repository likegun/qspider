'use strict';
const path = require('path');
const co = require('co');
require('app-module-path').addPath(path.resolve(__dirname, '..'));

co(function *() {
  const registration = JSON.parse(process.env.registration);
  const Job = require(registration.job_file);

  const job = new Job();
  yield job.start();

  process.exit(0);
})
.catch(err => {
  console.log(err);
  process.exit(1);
});
