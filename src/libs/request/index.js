'use strict';
const request = require('request');

const get = (url, qs = {}, headers = {}) => {
  return new Promise((resolve, reject) => {
    request.get({
      url,
      qs,
      headers
    }, (err, res, body) => {
      if(err)
        return reject(err);
      else
        return resolve({ res, body });
    });
  });
};

module.exports = {
  get
};
