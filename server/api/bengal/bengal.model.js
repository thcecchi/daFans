'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var BengalSchema = new Schema({
  message: String,
  loc: String,
  user: String,
  time: String
});

module.exports = mongoose.model('Bengal', BengalSchema);
