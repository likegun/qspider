'use strict';
const mongoose = require('mongoose');

const CONST = require('src/const');

const FollowUserListSchema = new mongoose.Schema({
  url: {
    type: String,
    comment: '获取关注用户分页中一页数据的url',
    required: true
  },
  second_job_status: {
    type: String,
    comment: '爬取状态',
    required: true,
    default: CONST.JOB_STATUS[0]
  }
});

const FollowUserList = mongoose.model('Zhihu-Follow-User-List', FollowUserListSchema);

module.exports = FollowUserList;
