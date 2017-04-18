'use strict';
const co = require('co');
const { format } = require('util');

const CONST = require('src/const');
const CONST_ZHIHU = require('src/const/zhihu');
const ERRORS_ZHIHU = require('src/const/zhihu/errors');
const User = require('src/models/zhihu/User');
const Follow_user_list = require('src/models/zhihu/Follow-user-list');
const get = require('src/modules-request/zhihu/get');

class SecondJob {
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
        const follow_user_list = yield Follow_user_list.findOneAndUpdate({
          second_job_status: CONST.JOB_STATUS[0]
        }, {
          $set: {
            second_job_status: CONST.JOB_STATUS[1]
          }
        });

        if(!follow_user_list)
          continue;

        const { body } = yield get(follow_user_list.url);
        const follow_users = self.getFollowUsers(follow_user_list.url, body);

        for(const follow_user of follow_users) {
          const user = yield User.findOneAndUpdate(follow_user, {
            $set: follow_user
          }, {
            upsert: true,
            new: true
          }).exec();

          yield user.save();
        }

        follow_user_list.second_job_status = CONST.JOB_STATUS[2];
        yield follow_user_list.save();
      }
    });
  }

  getFollowUsers(url, body) {
    try {
      console.log(body);
      body = JSON.parse(body);
      return body.data.map(e => ({
        username: e.url_token,
        home_page_url: format(CONST_ZHIHU.HOME_PAGE_URL_FORMAT, e.url_token)
      }));
    } catch (e) {
      throw new Error(ERRORS_ZHIHU.CAN_NOT_PARSE_FOLLOW_USER_LIST_FUNC(url));
    }
  }
}

module.exports = SecondJob;
