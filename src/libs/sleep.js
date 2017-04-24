'use strict';

const sleep = (millseconds) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(), millseconds);
  });
};

module.exports = sleep;
