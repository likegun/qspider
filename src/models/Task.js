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
  },
  jobs: [
    new mongoose.Schema({
      job_file: {
        type: String,
        comment: '任务文件',
        required: true
      },
      total_count: {
        type: Number,
        comment: '总共所需进程',
        required: true
      },
      status: {
        type: Boolean,
        comment: '此工作状态',
        required: false,
        default: false
      },
      relyOn: {
        type: [String],
        comment: '所依赖的job_file数组',
        required: false,
        default: []
      }
    })
  ]
});

const Task = mongoose.model('Task', TaskSchema);

module.exports = Task;
