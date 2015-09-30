'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var RaiderSchema = new Schema({
  name: String,
  info: String,
  active: Boolean
});

module.exports = mongoose.model('Raider', RaiderSchema);