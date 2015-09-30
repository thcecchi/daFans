'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var LionSchema = new Schema({
  name: String,
  info: String,
  active: Boolean
});

module.exports = mongoose.model('Lion', LionSchema);