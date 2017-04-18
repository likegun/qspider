'use strict';
const request = require('request');

const get = (url, headers = {}) => {

  return new Promise((resolve, reject) => {
    request.get(url, {
    }, (err, res, body) => {
      if(err)
        return reject(err);
      resolve({ res, body });
    });
  });
};

module.exports = get;
