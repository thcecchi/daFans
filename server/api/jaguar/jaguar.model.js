'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var JaguarSchema = new Schema({
  message: String,
  loc: String,
  user: String
});

module.exports = mongoose.model('Jaguar', JaguarSchema);
