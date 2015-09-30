'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var EagleSchema = new Schema({
  name: String,
  info: String,
  active: Boolean
});

module.exports = mongoose.model('Eagle', EagleSchema);