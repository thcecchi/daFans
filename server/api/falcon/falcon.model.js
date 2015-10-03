'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var FalconSchema = new Schema({
  message: String,
  loc: String,
  user: String
});

module.exports = mongoose.model('Falcon', FalconSchema);
