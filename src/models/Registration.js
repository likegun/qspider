'use strict';
const mongoose = require('mongoose');

const CONST = require('src/const');

const RegistrationSchema = new mongoose.Schema({
  task_id: {
    type: mongoose.Schema.Types.ObjectId,
    comment: 'Task集合主键',
    required: true
  },
  job_file: {
    type: String,
    comment: '任务文件',
    required: true
  },
  identifying: {
    type: String,
    comment: '承接机器标识',
    required: false,
    defalut: null
  },
  task_priority: {
    type: Number,
    comment: '任务优先级，越小优先级越高',
    required: true,
    default: 10
  },
  job_priority: {
    type: Number,
    comment: '任务中的工作优先级，越小优先级越高',
    required: true,
    default: 10
  },
  status: {
    type: String,
    comment: '任务状态',
    required: true,
    default: CONST.JOB_STATUS[0]
  },
  relyJobs: {
    type: [String],
    comment: '所依赖的job_file数组,只有这些job结束了，此job才能结束',
    required: false,
    default: []
  },
  beforeJobs: {
    type: [String],
    comment: '所依赖的job_file数组,只有这些job结束了，此job蔡能开始',
    required: false,
    default: []
  }
});

const Registration = mongoose.model('Registration', RegistrationSchema);

module.exports = Registration;
