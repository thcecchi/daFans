'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var BearSchema = new Schema({
  name: String,
  info: String,
  active: Boolean
});

module.exports = mongoose.model('Bear', BearSchema);