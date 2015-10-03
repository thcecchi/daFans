'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var RamSchema = new Schema({
  message: String,
  loc: String,
  user: String
});

module.exports = mongoose.model('Ram', RamSchema);
