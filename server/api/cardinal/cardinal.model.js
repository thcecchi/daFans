'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var CardinalSchema = new Schema({
  message: String,
  loc: String,
  user: String,
  time: String
});

module.exports = mongoose.model('Cardinal', CardinalSchema);
