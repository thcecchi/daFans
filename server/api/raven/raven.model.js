'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var RavenSchema = new Schema({
  message: String,
  loc: String,
  user: String,
  time: String
});

module.exports = mongoose.model('Raven', RavenSchema);
