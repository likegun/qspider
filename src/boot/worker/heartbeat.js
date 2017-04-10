'use strict';
const co = require('co');

const debug_error = require('debug')('error');

const Heartbeat = require('src/models/Heartbeat');
const config = require('src/common/get-config');
const identifying = require('src/common/get-identifying');
const CONST = require('src/const');

let last_beat_over = true;

setInterval(() => {
  if(!last_beat_over)
    return;

  co(function *() {
    let heartbeat = yield Heartbeat.findOne({
      identifying: identifying
    })
    .exec();

    if(heartbeat) {
      heartbeat.last_beat_timestamp = Date.now();
      return yield heartbeat.save();
    }

    heartbeat = new Heartbeat({
      identifying: identifying,
      last_beat_timestamp: Date.now()
    });
    yield heartbeat.save();
    last_beat_over = true;
  })
  .catch(err => {
    console.log(err);
    process.exit(1);
  });
}, config.HEARTBEAT_INTERVAL || CONST.HEARTBEAT_INTERVAL);
