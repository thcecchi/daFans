'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var CardinalSchema = new Schema({
  name: String,
  info: String,
  active: Boolean
});

module.exports = mongoose.model('Cardinal', CardinalSchema);