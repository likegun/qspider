'use strict';
const mongoose = require('mongoose');

const HeartbeatSchema = new mongoose.Schema({
  identifying: {
    type: String,
    comment: '机器标识',
    required: true
  },
  last_beat_timestamp: {
    type: Number,
    comment: '上次心跳时间',
    required: true
  }
});

const Heartbeat = mongoose.model('Heartbeat', HeartbeatSchema);

module.exports = Heartbeat;
