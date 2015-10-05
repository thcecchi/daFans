'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var LionSchema = new Schema({
  message: String,
  loc: String,
  user: String,
  time: String
});

module.exports = mongoose.model('Lion', LionSchema);
