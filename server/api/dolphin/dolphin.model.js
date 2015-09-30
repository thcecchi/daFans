'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var DolphinSchema = new Schema({
  name: String,
  info: String,
  active: Boolean
});

module.exports = mongoose.model('Dolphin', DolphinSchema);