'use strict';
const mongoose = require('mongoose');

const mongodb = require('src/common/get-config').mongodb;

mongoose.connect(mongodb.uri, mongodb.options, function(err) {
  if(err) {
    console.error(err);
    process.exit(0);
  }
});
