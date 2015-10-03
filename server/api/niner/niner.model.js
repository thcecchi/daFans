'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var NinerSchema = new Schema({
  message: String,
  loc: String,
  user: String
});

module.exports = mongoose.model('Niner', NinerSchema);
