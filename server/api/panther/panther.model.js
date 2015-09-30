'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var PantherSchema = new Schema({
  name: String,
  info: String,
  active: Boolean
});

module.exports = mongoose.model('Panther', PantherSchema);