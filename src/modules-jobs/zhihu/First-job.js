'use strict';
const co = require('co');
const { format } = require('util');

const CONST = require('src/const');
const CONST_ZHIHU = require('src/const/zhihu');
const ERRORS_ZHIHU = require('src/const/zhihu/errors');
const User = require('src/models/zhihu/User');
const Follow_user_list = require('src/models/zhihu/Follow-user-list');
const get = require('src/modules-request/zhihu/get');

class FirstJob {
  constructor() {
    this.over = false;
  }

  canStart() {
    return Promise.resolve(true);
  }

  overOrNot() {
    return this.over;
  }

  start() {
    const self = this;

    return co(function *() {
      while(!self.overOrNot()) {
        const user = yield User.findOneAndUpdate({
          first_job_status: CONST.JOB_STATUS[0]
        }, {
          $set: {
            first_job_status: CONST.JOB_STATUS[1]
          }
        });

        if(!user)
          continue;

        const { body } = yield get(user.home_page_url);

        const fans_count = self.getFansCount(user.home_page_url, body);
        const follow_user_count = self.getFollowUserCount(user.home_page_url, body);
        const total_follow_user_page_count = Math.ceil(follow_user_count / 20);

        for(let i = 1; i <= total_follow_user_page_count; i++) {
          const follow_user_list = new Follow_user_list({
            url: format(CONST_ZHIHU.FOLLOW_API_URL_FORMAT, user.username, ( i - 1) * 20, 20)
          });
          yield follow_user_list.save();
        }

        user.fans_count = fans_count;
        user.follow_user_count = follow_user_count;
        user.first_job_status = CONST.JOB_STATUS[2];

        yield user.save();
      }
    });
  }

  getFollowUserCount(url, body = '') {
    const match = body.match(/关注了.*?<\/div>.*?<div.*?class=\"NumberBoard-value\".*?>(\d+)/);

    if(match)
      return parseInt(match[1]);

    throw new Error(ERRORS_ZHIHU.CAN_NOT_GET_FOLLOW_USER_COUNT_FUNC(url));
  }

  getFansCount(url, body = '') {
    const match = body.match(/class=\"NumberBoard-name\".*?>关注者.*?<\/div>.*?<div.*?class=\"NumberBoard-value\".*?>(\d+)/);

    if(match)
      return parseInt(match[1]);

    throw new Error(ERRORS_ZHIHU.CAN_NOT_GET_FANS_COUNT_FUNC(url));
  }
}

module.exports = FirstJob;
