'use strict';
const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  name: {
    type: String,
    comment: '任务名称'
  },
  priority: {
    type: Number,
    comment: '任务优先级，越小优先级越高',
    required: false,
    default: 10
  }
});

const Task = mongoose.model('Task', TaskSchema);

module.exports = Task;
