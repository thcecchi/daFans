'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var RavenSchema = new Schema({
  name: String,
  info: String,
  active: Boolean
});

module.exports = mongoose.model('Raven', RavenSchema);