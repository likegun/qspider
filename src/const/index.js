'use strict';
module.exports = {
  ROLES: ['master', 'worker', 'slave'],
  DEFAULT_ROLE: 'worker',
  DEFAULT_NODE_ENV: 'test',
  DEFAULT_MASTER_PORT: 3000,
  DEFAULT_WORKER_PORT: 3001,
  HEARTBEAT_INTERVAL: 5000,
  GET_JOB_INTERVAL: 5000,
  FREE_JOB_INTERVAL: 5000,
  HEARTBEAT_TIMEOUT: 60000,
  JOB_STATUS: ['uncrawl', 'crawling', 'crawled']
};
