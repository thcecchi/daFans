'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var JetSchema = new Schema({
  message: String,
  loc: String,
  user: String
});

module.exports = mongoose.model('Jet', JetSchema);
