'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var NinerSchema = new Schema({
  name: String,
  info: String,
  active: Boolean
});

module.exports = mongoose.model('Niner', NinerSchema);