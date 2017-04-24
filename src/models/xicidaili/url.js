'use strict';
const mongoose = require('mongoose');

const CONST = require('src/const');

const UrlSchema = new mongoose.Schema({
  url: {
    type: String,
    comment: '分页url',
    required: true
  },
  status: {
    type: String,
    comment: '爬取状态',
    required: true,
    default: CONST.JOB_STATUS[0]
  }
});

const Url = mongoose.model('Xicidaili_Url', UrlSchema);

module.exports = Url;
