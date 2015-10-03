'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var PantherSchema = new Schema({
  message: String,
  loc: String,
  user: String
});

module.exports = mongoose.model('Panther', PantherSchema);
