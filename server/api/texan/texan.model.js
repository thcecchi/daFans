'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var TexanSchema = new Schema({
  name: String,
  info: String,
  active: Boolean
});

module.exports = mongoose.model('Texan', TexanSchema);