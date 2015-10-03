'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var SteelerSchema = new Schema({
  message: String,
  loc: String,
  user: String
});

module.exports = mongoose.model('Steeler', SteelerSchema);
