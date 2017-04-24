'use strict';
const mongoose = require('mongoose');

const ProxySchema = new mongoose.Schema({
  url: {
    type: String,
    comment: '协议',
    required: true
  }
});

const Proxy = mongoose.model('Xicidaili_Proxy', ProxySchema);

module.exports = Proxy;
