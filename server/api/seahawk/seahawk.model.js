'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var SeahawkSchema = new Schema({
  message: String,
  loc: String,
  user: String
});

module.exports = mongoose.model('Seahawk', SeahawkSchema);
