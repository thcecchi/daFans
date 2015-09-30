'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ColtSchema = new Schema({
  name: String,
  info: String,
  active: Boolean
});

module.exports = mongoose.model('Colt', ColtSchema);