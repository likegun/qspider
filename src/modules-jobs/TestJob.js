'use strict';

class TestJob {
  start() {
    return Promise.reject();
  }
}

module.exports = TestJob;
