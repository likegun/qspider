'use strict';
const co = require('co');

const Job = require('src/modules-jobs/Job');
const CONST = require('src/const');
const PROXY_CONST = require('src/const/xicidaili');
const { get } = require('src/libs/request');
const Url = require('src/models/xicidaili/Url');
const Proxy = require('src/models/xicidaili/Proxy');
const sleep = require('src/libs/sleep');

class GetProxy extends Job{
  constructor(registration) {
    super(registration);
  }

  start() {
    const self = this;

    return co(function *() {
      while(self.run) {
        //防止被封
        yield sleep(PROXY_CONST.REQUEST_SLEEP || 5000);

        const url = yield Url.findOneAndUpdate({
          status: CONST.JOB_STATUS[0]
        }, {
          $set: {
            status: CONST.JOB_STATUS[1]
          }
        });

        if(!url) {
          yield self.checkOverOrNot();
          continue;
        }

        const { body } = yield get(url.url);
        const matchTrArr = body.match(/<tr.*?class=\"odd.*?>([\s\S]*?)<\/tr/g);
        for(let matchTr of matchTrArr) {
          const regex = /<td.*?>([\s\S]*?)<\/td/g;
          let match;
          let matchArr = [];
          while((match = regex.exec(matchTr)) !== null) {
            matchArr.push(match[1]);
          }
          //只要爬http与https协议的
          matchArr[5] = matchArr[5].toLowerCase();
          if(PROXY_CONST.ACCEPT_PROXYS.includes(matchArr[5])) {
            const proxy = new Proxy({
              url: `${matchArr[5].toLowerCase()}://${matchArr[1]}:${matchArr[2]}`
            });
            yield proxy.save();
          }
        }
      }
    });
  }
}

module.exports = GetProxy;
