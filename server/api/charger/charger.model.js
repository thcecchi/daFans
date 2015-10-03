'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ChargerSchema = new Schema({
  message: String,
  loc: String,
  user: String
});

module.exports = mongoose.model('Charger', ChargerSchema);
