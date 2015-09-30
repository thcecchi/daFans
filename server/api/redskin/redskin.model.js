'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var RedskinSchema = new Schema({
  name: String,
  info: String,
  active: Boolean
});

module.exports = mongoose.model('Redskin', RedskinSchema);