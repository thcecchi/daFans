'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var TitanSchema = new Schema({
  message: String,
  loc: String,
  user: String
});

module.exports = mongoose.model('Titan', TitanSchema);
