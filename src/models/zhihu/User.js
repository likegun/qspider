'use strict';
const mongoose = require('mongoose');

const CONST = require('src/const');

const UserSchema = new mongoose.Schema({
  home_page_url: {
    type: String,
    comment: '用户个人主页地址',
    required: true
  },
  username: {
    type: String,
    comment: '用户名',
    required: true
  },
  fans_count: {
    type: Number,
    comment: '粉丝数',
    required: false
  },
  follow_user_count: {
    type: Number,
    comment: '关注用户数量',
    required: false
  },
  first_job_status: {
    type: String,
    comment: '爬取状态',
    required: true,
    default: CONST.JOB_STATUS[0]
  }
});

const User = mongoose.model('Zhihu-User', UserSchema);

module.exports = User;
