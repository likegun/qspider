'use strict';
const co = require('co');

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
